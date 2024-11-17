import cv2
import numpy as np
import sys
import os

# Function to adjust contrast using histogram equalization
def enhance_contrast(image):
    """
    Enhances the contrast of the image by converting to LAB color space
    and applying CLAHE to the L channel.
    """
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)  # Convert to LAB color space
    l, a, b = cv2.split(lab)  # Split into L, A, and B channels
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))  # Apply CLAHE
    l_clahe = clahe.apply(l)
    lab_clahe = cv2.merge((l_clahe, a, b))  # Merge the adjusted L channel back
    return cv2.cvtColor(lab_clahe, cv2.COLOR_LAB2BGR)  # Convert back to BGR

# Function to sharpen the image
def sharpen_image(image):
    """
    Sharpens the image using a kernel.
    """
    kernel = np.array([[0, -1, 0], 
                       [-1, 5, -1], 
                       [0, -1, 0]])  # Sharpening kernel
    return cv2.filter2D(image, -1, kernel)

# Start of execution
filename = sys.argv[1] if len(sys.argv) > 1 else input("Please provide the image filename: ")

# Load the image
image = cv2.imread(filename)

# Check if the image was successfully loaded
if image is None:
    print("Error: Could not load image.")
    sys.exit(1)

# Enhance contrast
contrast_enhanced_image = enhance_contrast(image)

# Sharpen the image
sharpened_image = sharpen_image(contrast_enhanced_image)

# Ensure the "enhanced_output" directory exists
output_dir = "enhanced_output"
os.makedirs(output_dir, exist_ok=True)

# Generate output path
output_path = os.path.join(output_dir, f"enhanced_{os.path.basename(filename)}")

# Save the enhanced image
cv2.imwrite(output_path, sharpened_image)

print(f"Enhanced image saved as '{output_path}'")