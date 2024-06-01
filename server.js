const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint to list subfolders and their first images
app.get('/galleries', (req, res) => {
    const imagesPath = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan folder');
        }
        const folders = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        const galleryPromises = folders.map(folder => {
            return new Promise((resolve, reject) => {
                const folderPath = path.join(imagesPath, folder);
                fs.readdir(folderPath, (err, files) => {
                    if (err) {
                        return reject(err);
                    }
                    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
                    if (imageFiles.length > 0) {
                        resolve({ folder, image: imageFiles[0] });
                    } else {
                        resolve(null);
                    }
                });
            });
        });

        Promise.all(galleryPromises).then(results => {
            res.json(results.filter(result => result !== null));
        }).catch(error => {
            res.status(500).send('Error reading subfolders');
        });
    });
});

// Serve the index.html file for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to list images in a specific subfolder
app.get('/get/img/:foldername', (req, res) => {
    const foldername = req.params.foldername;
    const folderPath = path.join(__dirname, 'public', 'images', foldername);

    // Read the contents of the subfolder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading subfolder');
        }

        // Filter out only image files
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        // Send the list of image files as a JSON response
        res.json(imageFiles);
    });
});

// Serve the gallery page for subfolders
app.get('/:folder', (req, res, next) => {
    const folder = req.params.folder;
    const imagePath = path.join(__dirname, 'public', 'images', folder);
    fs.stat(imagePath, (err, stats) => {
        if (err || !stats.isDirectory()) {
            return next(); // Pass to the next middleware
        }
        res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
    });
});

// Serve individual images within a subfolder
app.get('/:folder/:imageNumber', (req, res, next) => {
    const folder = req.params.folder;
    const imageNumber = parseInt(req.params.imageNumber);
    
    if (isNaN(imageNumber) || imageNumber < 1) {
        return next(); // Pass to the next middleware if imageNumber is not a positive number
    }

    const folderPath = path.join(__dirname, 'public', 'images', folder);
    
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return next(err); // Pass to the error handler if an error occurs
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        
        // Sort image files alphabetically to ensure consistent ordering
        imageFiles.sort();

        // Check if the image number exceeds the number of images in the folder
        if (imageNumber > imageFiles.length) {
            return next(); // Pass to the next middleware if image number is out of range
        }

        // Get the file path of the image based on the specified position
        const imagePath = path.join(folderPath, imageFiles[imageNumber - 1]);
        const htmlPath = path.join(__dirname, 'public', 'image.html');

        // Read the HTML file content
        fs.readFile(htmlPath, 'utf8', (err, htmlContent) => {
            if (err) {
                return next(err); // Pass to the error handler if an error occurs
            }

            // Send the HTML content with image path as a response
            res.send(htmlContent.replace('{imagePath}', `/images/${folder}/${imageFiles[imageNumber-1]}`));
        });
    });
});

// Serve the list of subfolders
app.get('/get/folders', (req, res) => {
    const imagesPath = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            res.status(500).send('Error reading images directory');
            return;
        }
        const folders = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        res.json(folders);
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
