import cv2
import sys
import os
import requests
from urllib.parse import urlparse

# Function to mirror the image horizontally
def mirror_horizontal(image):
    """
    Mirrors the image horizontally.
    :param image: Input image
    :return: Horizontally mirrored image
    """
    return cv2.flip(image, 1)

# Function to download the image from a URL
def download_image(url, save_dir="downloads"):
    os.makedirs(save_dir, exist_ok=True)  # Ensure the directory exists
    filename = os.path.basename(urlparse(url).path)  # Extract the file name from the URL
    save_path = os.path.join(save_dir, filename)
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
        return save_path, filename
    else:
        print("Error: Unable to download the image.")
        sys.exit(1)

# Main execution
filename = sys.argv[1] if len(sys.argv) > 1 else input("Please provide the image filename (URL or path): ")

# Check if the input is a URL
if filename.startswith("http"):
    local_filename, original_name = download_image(filename)  # Download and get the local path and original file name
else:
    local_filename = filename
    original_name = os.path.basename(filename)

# Load the image
image = cv2.imread(local_filename)

# Check if the image was successfully loaded
if image is None:
    print("Error: Could not load image.")
    sys.exit(1)

# Mirror the image horizontally
horizontal_image = mirror_horizontal(image)

# Ensure the "mirrored_output" directory exists
output_dir = "Mirrored_Images"
os.makedirs(output_dir, exist_ok=True)

# Save the horizontally mirrored image using the original file name
horizontal_path = os.path.join(output_dir, f"mirrored_{original_name}")
cv2.imwrite(horizontal_path, horizontal_image)

print(f"Horizontally mirrored image saved as '{horizontal_path}'")

# Clean up temporary file if downloaded
if filename.startswith("http") and os.path.exists(local_filename):
    os.remove(local_filename)
