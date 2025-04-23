<?php
$folder = $_GET['folder']; // Get folder name from query string (e.g., 'de_lecture_3')
$directory = "../images/$folder/"; // Specify the directory

// Open directory and read files
if (is_dir($directory)) {
    $files = scandir($directory); // Get all files in directory
    $imageFiles = [];

    // Loop through files and filter out non-image files
    foreach ($files as $file) {
        // Only accept image files (jpg, jpeg, png, gif)
        if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
            $imageFiles[] = $directory . $file; // Add full path to image
        }
    }

    // Return JSON response with list of image URLs
    echo json_encode($imageFiles);
} else {
    echo json_encode([]);
}
?>
