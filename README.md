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
    git clone https://github.com/yxlow07/image-gallery-viewer.git
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

5. Optional Auto-Start / Pre-configuring options
	- Run `silent.vbs` included in root folder, no setup is required, it should work as intended
	- Add a task in `Task Scheduler` for `Windows` to let it run on startup
	- If you want to access the server using a normalised url such as `http://node.read`, you can configure it in the hosts file to point towards 127.0.0.1, detailed instructions are as below under **usage**

## Usage

1. Place your images in the `public/images/yoursubfolder` directory. Organize them into subfolders (chapters, books, etc.).
2. Access the application by navigating to `http://localhost:3000` in your web browser.
3. Browse the gallery of subfolders, labelled by their name and first picture:
    - Click on an image to view its whole subfolder in detail.
    - Use the `ArrowLeft` and `ArrowRight` or `a` and `d` keys to navigate between images.

## `Windows` only setup for server
1. Navigate to `C:\Windows\System32\drivers\etc` and open the file `hosts` using any text editor with administrator privileges.

2. Add on a line at the bottom `127.0.0.1 yourcustomurl.com` and save the file

3. Now, navigate to your browser and go to `yourcustomurl.com:3000` and you will now see the server running!
	
4. Additional steps: allowing you to go to `yourcustomurl.com` without typing 3000 is as below:

5. Install an nginx server and configure it or use `XAMPP` built-in apache server. Open the vhosts file and add on the below code:
```apache
<VirtualHost *:80>
	ServerName yourcustomurl.com
	ProxyPreserveHost On
	ProxyPass / http://localhost:3000/
	ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```
6. Edit your `httpd.conf` to make sure the code below exists and is uncommented
```apache
# Virtual hosts
Include conf/extra/httpd-vhosts.conf

# Included modules to prevent ssl errors
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
``` 
7. Restart your apache / nginx server and navigate to `yourcustomurl.com` and see the results!

## Features yet to Implement

1. Lazy loading and SPA loading
2. Ability to use `w` and `s` keys to go up and down
3. Ability to search
4. Ability to press right side of image to navigate

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Please ensure that your code follows the existing code style and conventions.

## License


This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
