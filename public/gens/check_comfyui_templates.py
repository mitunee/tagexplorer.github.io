import os
import json
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Optional

def create_comfyui_config():
    """Create the ComfyUI.config file if it doesn't exist."""
    config_content = """# ComfyUI.config
# Config file for the workflow and prompt tags added by ComfyUI
%Image::ExifTool::UserDefined = (
    'Image::ExifTool::PNG::TextualData' => {
        workflow => { %unreg }, # (written by ComfyUI)
        prompt => { %unreg }, # (written by ComfyUI)
    },
);
1;
"""
    config_path = Path('ComfyUI.config')
    if not config_path.exists():
        with open(config_path, 'w') as f:
            f.write(config_content)
        print("Created ComfyUI.config file")
    return str(config_path)

def extract_png_metadata(filepath: str) -> Optional[Dict]:
    """Extract ComfyUI metadata from PNG file using exiftool."""
    try:
        # Ensure config file exists
        config_file = create_comfyui_config()
        
        # Run exiftool with the config to get the prompt metadata
        result = subprocess.run(
            ['exiftool', '-config', config_file, '-prompt', '-j', filepath],
            capture_output=True,
            text=True,
            check=True
        )
        
        data = json.loads(result.stdout)
        if data and len(data) > 0:
            # Check for both 'prompt' and 'Prompt' (case sensitivity)
            prompt_data = data[0].get('Prompt') or data[0].get('prompt')
            if prompt_data:
                return json.loads(prompt_data)
        return None
    except (subprocess.CalledProcessError, json.JSONDecodeError, KeyError) as e:
        print(f"Error extracting metadata from {filepath}: {e}")
        return None

def get_clip_text_encode_prompts(metadata: Dict) -> Tuple[str, str]:
    """Extract positive and negative prompts from ComfyUI metadata."""
    positive_prompt = ""
    negative_prompt = ""
    
    # Find CLIPTextEncode nodes
    for node_id, node_data in metadata.items():
        if node_data.get('class_type') == 'CLIPTextEncode':
            text = node_data['inputs']['text']
            # Check if this is the negative prompt (contains 'worst quality')
            if 'worst quality' in text:
                negative_prompt = text
            else:
                positive_prompt = text
    
    return positive_prompt, negative_prompt

def parse_template_prompt(prompt: str) -> Tuple[str, str]:
    """Parse the template prompt to extract base and tag parts."""
    # The template ends with double comma
    if ',,' in prompt:
        base_part = prompt.rsplit(',,', 1)[0] + ','
        return base_part, ""
    return prompt, ""

def check_prompt_follows_template(template_prompt: str, actual_prompt: str, filename: str) -> Optional[Dict]:
    """Check if actual prompt follows the template and return discrepancy if any."""
    base_template, _ = parse_template_prompt(template_prompt)
    
    # Extract the tag name from filename (remove _00001_.png suffix)
    tag_name = filename.replace('_00001_.png', '')
    
    # Expected prompt should be base_template + space + (tag:weight),
    expected_prompt = f"{base_template} ({tag_name}:1.1),"
    
    if actual_prompt != expected_prompt:
        # Check if it's just a weight difference
        if actual_prompt.startswith(base_template) and f"({tag_name}:" in actual_prompt:
            return {
                'type': 'weight_mismatch',
                'expected': expected_prompt,
                'actual': actual_prompt
            }
        else:
            return {
                'type': 'template_mismatch',
                'expected': expected_prompt,
                'actual': actual_prompt
            }
    
    return None

def check_negative_prompt(negative_prompt: str) -> bool:
    """Check if negative prompt matches one of the expected defaults."""
    expected_negatives = [
        "worst quality, nude, completely nude, loli, text, watermark,",
        "worst quality, nude, completely nude,"
    ]
    return negative_prompt in expected_negatives

def process_directory(directory: Path) -> List[Dict]:
    """Process a directory and check all images against the template."""
    issues = []
    
    # Find the no tag template file
    no_tag_file = directory / "no tag_00001_.png"
    if not no_tag_file.exists():
        print(f"Warning: No template file found in {directory}")
        return issues
    
    # Extract template metadata
    template_metadata = extract_png_metadata(str(no_tag_file))
    if not template_metadata:
        print(f"Warning: Could not extract metadata from {no_tag_file}")
        return issues
    
    template_positive, template_negative = get_clip_text_encode_prompts(template_metadata)
    
    # Process all PNG files in the directory
    for png_file in directory.glob("*_00001_.png"):
        if png_file.name == "no tag_00001_.png":
            continue
        
        metadata = extract_png_metadata(str(png_file))
        if not metadata:
            issues.append({
                'file': str(png_file),
                'issue': 'Could not extract metadata'
            })
            continue
        
        positive_prompt, negative_prompt = get_clip_text_encode_prompts(metadata)
        
        # Check positive prompt
        prompt_issue = check_prompt_follows_template(template_positive, positive_prompt, png_file.name)
        if prompt_issue:
            issues.append({
                'file': str(png_file),
                'issue': 'Positive prompt mismatch',
                'details': prompt_issue
            })
        
        # Check negative prompt
        if not check_negative_prompt(negative_prompt):
            issues.append({
                'file': str(png_file),
                'issue': 'Negative prompt mismatch',
                'details': {
                    'expected': "One of: ['worst quality, nude, completely nude, loli, text, watermark,', 'worst quality, nude, completely nude,']",
                    'actual': negative_prompt
                }
            })
    
    return issues

def main():
    """Main function to process all subdirectories."""
    current_dir = Path('.')
    all_issues = []
    
    # Process all subdirectories except ./artists/
    for subdir in current_dir.iterdir():
        if subdir.is_dir() and subdir.name != 'artists':
            print(f"Processing directory: {subdir}")
            issues = process_directory(subdir)
            all_issues.extend(issues)
    
    # Report all issues
    if all_issues:
        print("\n" + "="*80)
        print("ISSUES FOUND:")
        print("="*80 + "\n")
        
        for issue in all_issues:
            print(f"File: {issue['file']}")
            print(f"Issue: {issue['issue']}")
            if 'details' in issue:
                details = issue['details']
                if isinstance(details, dict):
                    if 'type' in details:
                        print(f"Type: {details['type']}")
                    if 'expected' in details:
                        print(f"Expected: {details['expected']}")
                    if 'actual' in details:
                        print(f"__Actual: {details['actual']}")
            print("-" * 80)
    else:
        print("\nAll images follow the template correctly!")

if __name__ == "__main__":
    main()
