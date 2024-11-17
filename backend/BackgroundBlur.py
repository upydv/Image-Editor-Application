import cv2
import numpy as np
import sys
import os
import requests
from PIL import Image

# Function to download the image from a URL and convert it to a NumPy array
def load_image_from_url(url):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        image_data = np.asarray(bytearray(response.content), dtype="uint8")
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        if image is None:
            raise ValueError("Error: Unable to decode the image from the URL.")
        return image
    else:
        raise ValueError(f"Error: Unable to fetch image from URL (status code: {response.status_code})")

# Function to apply Gaussian blur
def gaussian_blur(image, kernel_size=(15, 15), sigma=0):
    return cv2.GaussianBlur(image, kernel_size, sigma)

# Function to load and apply deep learning model for foreground segmentation
def segment_foreground(image):
    mask = np.zeros(image.shape[:2], np.uint8)
    bgd_model = np.zeros((1, 65), np.float64)
    fgd_model = np.zeros((1, 65), np.float64)
    rect = (10, 10, image.shape[1]-10, image.shape[0]-10)
    cv2.grabCut(image, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
    foreground = image * mask2[:, :, np.newaxis]
    return foreground, mask2

# Function to refine the foreground mask
def refine_mask(mask2):
    kernel = np.ones((5, 5), np.uint8)
    refined_mask = cv2.dilate(mask2, kernel, iterations=3)
    return refined_mask

# Function to combine blurred background with sharp foreground
def blur_background(image, refined_mask, blur_method='gaussian', kernel_size=(15, 15), sigma=0):
    blurred_image = gaussian_blur(image, kernel_size, sigma)
    output_image = image.copy()
    output_image[refined_mask == 0] = blurred_image[refined_mask == 0]
    return output_image

# Main execution
filename = sys.argv[1] if len(sys.argv) > 1 else input("Please provide the image filename or URL: ")

# Load the image (handle both local and URL cases)
if filename.startswith("http"):
    try:
        image = load_image_from_url(filename)
    except ValueError as e:
        print(e)
        sys.exit(1)
else:
    image = cv2.imread(filename)

if image is None:
    print("Error: Could not load image.")
    sys.exit(1)

# Segment the image into foreground and background
foreground, mask2 = segment_foreground(image)

# Refine the foreground mask
refined_mask = refine_mask(mask2)

# Apply blur only to the background
output_image = blur_background(image, refined_mask, blur_method='gaussian', kernel_size=(15, 15), sigma=10)

# Ensure the "blurred_output" directory exists
output_dir = "Blur_Images"
os.makedirs(output_dir, exist_ok=True)

# Determine the output filename
if filename.startswith("http"):
    output_filename = f"BackgroundBlur_{os.path.basename(filename)}"
else:
    output_filename = f"BackgroundBlur_{os.path.basename(filename)}"

# Full path to save the output
output_path = os.path.join(output_dir, output_filename)

# Save the output image
cv2.imwrite(output_path, output_image)

print(f"Image with blurred background saved as '{output_path}'")
