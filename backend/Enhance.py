import cv2
import numpy as np
import sys
import os
import requests
from urllib.parse import urlparse

# Function to adjust contrast using histogram equalization
def enhance_contrast(image):
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)  # Convert to LAB color space
    l, a, b = cv2.split(lab)  # Split into L, A, and B channels
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))  # Apply CLAHE
    l_clahe = clahe.apply(l)
    lab_clahe = cv2.merge((l_clahe, a, b))  # Merge the adjusted L channel back
    return cv2.cvtColor(lab_clahe, cv2.COLOR_LAB2BGR)  # Convert back to BGR

# Function to sharpen the image
def sharpen_image(image):
    kernel = np.array([[0, -1, 0], 
                       [-1, 5, -1], 
                       [0, -1, 0]])  # Sharpening kernel
    return cv2.filter2D(image, -1, kernel)

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

# Start of execution
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

# Enhance contrast
contrast_enhanced_image = enhance_contrast(image)

# Sharpen the image
sharpened_image = sharpen_image(contrast_enhanced_image)

# Ensure the "enhanced_output" directory exists
output_dir = "Enhanced_Images"
os.makedirs(output_dir, exist_ok=True)

# Generate output path using the original name from the URL or file
output_path = os.path.join(output_dir, f"enhanced_{original_name}")

# Save the enhanced image
cv2.imwrite(output_path, sharpened_image)

print(f"Enhanced image saved as '{output_path}'")

# Clean up temporary file if downloaded
if filename.startswith("http") and os.path.exists(local_filename):
    os.remove(local_filename)
