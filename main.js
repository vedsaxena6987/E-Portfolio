// Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
        
        // Update active nav link
        document.querySelectorAll('nav a').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Blog functionality
let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

function createBlogPost() {
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    
    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }
    
    const blog = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString()
    };
    
    blogs.unshift(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';
    
    displayBlogs();
}

function displayBlogs() {
    const blogPosts = document.getElementById('blogPosts');
    blogPosts.innerHTML = blogs.map(blog => `
        <div class="blog-post">
            <h4>${blog.title}</h4>
            <div class="date">${blog.date}</div>
            <p>${blog.content}</p>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
        </div>
    `).join('');
}

function deleteBlog(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        blogs = blogs.filter(blog => blog.id !== id);
        localStorage.setItem('blogs', JSON.stringify(blogs));
        displayBlogs();
    }
}

// File upload functionality
let files = JSON.parse(localStorage.getItem('files')) || [];

function handleFileUpload() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file');
        return;
    }
    
    // Store file metadata
    const fileData = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        size: file.size,
        date: new Date().toLocaleDateString()
    };
    
    files.unshift(fileData);
    localStorage.setItem('files', JSON.stringify(files));
    
    fileInput.value = '';
    displayFiles();
}

function displayFiles() {
    const fileList = document.getElementById('uploadedFiles');
    fileList.innerHTML = files.map(file => `
        <li>
            <div>
                <strong>${file.name}</strong>
                <div>Uploaded: ${file.date}</div>
            </div>
            <div class="file-actions">
                <button onclick="deleteFile(${file.id})">Delete</button>
            </div>
        </li>
    `).join('');
}

function deleteFile(id) {
    if (confirm('Are you sure you want to delete this file?')) {
        files = files.filter(file => file.id !== id);
        localStorage.setItem('files', JSON.stringify(files));
        displayFiles();
    }
}

// Initial display
displayBlogs();
displayFiles();