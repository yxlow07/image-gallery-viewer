# Image Gallery Viewer

This project is an image gallery viewer that allows users to browse through images organized in subfolders. It provides keyboard navigation using the `a` and `d` keys. This project aims to relieve the slow loading of comic readers, which tend to request the images from another server, causing lag and other issues. 

By using this project, you can download the images and put it inside a subfolder and browse through it with no latency!

## Features

- Display images from subfolders in a gallery format
- Navigate through images within a folder
- Navigate between subfolders using the `a` and `d` keys
- Responsive design with TailwindCSS

## Prerequisites

- Node.js (v20 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/image-gallery-viewer.git
    cd image-gallery-viewer
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

1. Place your images in the `public/images/yoursubfolder` directory. Organize them into subfolders (chapters, books, etc.).
2. Access the application by navigating to `http://localhost:3000` in your web browser.
3. Browse the gallery of subfolders, labelled by their name and first picture:
    - Click on an image to view its whole subfolder in detail.
    - Use the `ArrowLeft` and `ArrowRight` or `a` and `d` keys to navigate between images.

## Features yet to Implement

1. Lazy loading and SPA loading
2. Ability to use `w` and `s` keys to go up and down
3. Ability to search
4. Ability to press right side of image to navigate

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Please ensure that your code follows the existing code style and conventions.

## License


This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
