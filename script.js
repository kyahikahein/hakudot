const allContent = [
    {
        type: 'Blog',
        title: "How Not to Love: A Manual of Restraint",
        date: 'Sep 13, 2025',
        readTime: '4 min',
        category: 'Life',
        url: '#/blog/how-not-to-love',
        contentFile: 'blog/how-not-to-love.html',
        emoji: '📝',
        preview: "A quick recap of my first few days hitting the gym. It's been a journey of sore muscles and small victories..."
    },
	{
        type: 'Blog',
        title: 'My First Few Days at the Gym',
        date: 'Sep 10, 2025',
        readTime: '5 min',
        category: 'Life',
        url: '#/blog/first-few-days',
        contentFile: 'blog/first-few-days.html',
        emoji: '🏋️',
        preview: "A quick recap of my first few days hitting the gym. It's been a journey of sore muscles and small victories..."
    }, 
	{
        type: 'Project',
        projectType: 'serious',
        title: 'sooon.....',
        description: '#',
        url: '#',
        emoji: '🤖',
        github: '',
        date: 'Aug 20, 2025',
        duration: '2 weeks',
        tech: 'Research',
        tags: ['', '']
    },
    {
        type: 'Project',
        projectType: 'fun',
        title: 'CrushGPT',
        description: 'An experimental project using language models to generate creative text formats.',
        url: 'https://crush-gpt.netlify.app/',
        external: true,
        emoji: '💗',
        github: 'https://github.com/kyahikahein/crush-gpt',
        date: 'Jul 15, 2025',
        duration: '1 week',
        tech: 'JavaScript',
        tags: ['Web App', 'Fun']
    },
    {
        type: 'Project',
        projectType: 'fun',
        title: 'Star-Vault',
        description: 'A web tool for bookmarking and organizing your favorite online resources with a stellar-themed interface.',
        url: 'https://star-vault.netlify.app/',
        external: true,
        emoji: '⭐',
        github: 'https://github.com/kyahikahein/star-vault',
        date: 'Jun 01, 2025',
        duration: '3 weeks',
        tech: 'HTML/CSS',
        tags: ['Utility']
    }
];

const createListItem = (item, showPreview = true) => {
    const element = document.createElement('div');
    element.className = 'list-item';

    if (item.type === 'Project') {
        const githubLinkHTML = item.github ? `
            <a href="${item.github}" target="_blank" rel="noopener noreferrer" class="github-link-button" title="View on GitHub">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.014c0 4.43 2.864 8.167 6.84 9.49.5.092.683-.217.683-.482 0-.237-.009-.868-.014-1.704-2.782.604-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.89 1.53 2.34 1.09 2.912.833.091-.647.35-1.09.635-1.34-2.22-.253-4.555-1.113-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.645 0 0 .84-.27 2.75 1.025A9.547 9.547 0 0112 6.844c.85.004 1.705.115 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.375.202 2.392.1 2.645.64.698 1.027 1.59 1.027 2.682 0 3.84-2.337 4.687-4.565 4.935.358.308.679.92.679 1.852 0 1.336-.012 2.415-.012 2.741 0 .268.18.578.688.48A10.01 10.01 0 0022 12.014C22 6.477 17.523 2 12 2z" clip-rule="evenodd"></path></svg>
                <span>GitHub</span>
            </a>
        ` : '';
        const metaDataHTML = `<div class="item-meta">${item.date} • ${item.duration} • ${item.tech}</div>`;
        const tagsHTML = item.tags && item.tags.length > 0 ? `
            <div class="project-tags">
                ${item.tags.slice(0, 2).map(tag => `<span class="tag-item">${tag}</span>`).join('')}
            </div>
        ` : '';

        let titleElement;
        if (item.external) {
            titleElement = `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="item-title-link"><span class="item-title">${item.emoji} ${item.title}</span></a>`;
        } else {
            titleElement = `<a href="#/projects" class="item-title-link"><span class="item-title">${item.emoji} ${item.title}</span></a>`;
        }
        
        element.innerHTML = `
            <div class="flex items-center">
                ${titleElement}
                 ${githubLinkHTML}
            </div>
            ${metaDataHTML}
            <p class="item-description">${item.description}</p>
            ${tagsHTML}
        `;
    } else {
        const previewHTML = (item.preview && showPreview) ? `<p class="item-description">${item.preview}</p>` : '';
        element.innerHTML = `
            <a href="${item.url}" class="item-title-link">
                <span class="item-title">${item.emoji} ${item.title}</span>
            </a>
            <div class="item-meta">${item.date} • ${item.readTime} • ${item.category}</div>
            ${previewHTML}
        `;
    }
    return element;
};

const renderPage = (pageType, containerId, options = {}) => {
    const { showPreview = true } = options;
    const templateId = {
        'project': 'projects-template',
        'blog': 'blog-list-template',
        'about': 'more-template'
    }[pageType];
    const templateNode = document.getElementById(templateId);

    if (!templateNode) {
        console.error(`Template with ID "${templateId}" not found.`);
        return document.createElement('div');
    }
    
    const template = templateNode.content.cloneNode(true);

    if (pageType === 'about') {
        return template;
    }

    if (pageType === 'project') {
        const seriousContainer = template.querySelector('#serious-project-list-container');
        const funContainer = template.querySelector('#fun-project-list-container');
        const projects = allContent.filter(item => item.type === 'Project');

        projects.forEach(item => {
            const projectItem = createListItem(item);
            if (item.projectType === 'serious') {
                seriousContainer.appendChild(projectItem);
            } else {
                funContainer.appendChild(projectItem);
            }
        });
    } else {
        const container = template.querySelector(`#${containerId}`);
        const items = allContent.filter(item => item.type.toLowerCase() === pageType);
        items.forEach(item => container.appendChild(createListItem(item, showPreview)));
    }
    
    return template;
};

const renderBlogPost = async (post) => {
    const template = document.getElementById('blog-post-template').content.cloneNode(true);
    const contentContainer = template.querySelector('#blog-post-content');
    
    const meta = `${post.date} • ${post.readTime} • ${post.category}`;
    const titleBlock = document.createElement('div');
    titleBlock.innerHTML = `
        <h1 class="page-title">${post.emoji} ${post.title}</h1>
        <p class="item-meta">${meta}</p>
    `;
    contentContainer.before(titleBlock);

    try {
        const response = await fetch(post.contentFile);
        if (!response.ok) throw new Error('Post not found');
        contentContainer.innerHTML = await response.text();
    } catch (error) {
        console.error('Error fetching blog post:', error);
        contentContainer.innerHTML = `<p>Could not load the blog post. This usually happens when not using a live server.</p>`;
    }

    return template;
};


const mainContent = document.getElementById('main-content');

const updateActiveNav = (currentPath) => {
    const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');
    navLinks.forEach(link => {
        const linkPath = link.hash.substring(1);
        link.classList.remove('active');

        if (linkPath === '/' && currentPath === '/') {
            link.classList.add('active');
        } else if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
            link.classList.add('active');
        }
    });
};

const applyStaggerAnimation = (isHome) => {
    if (!isHome) return;
    const items = mainContent.querySelectorAll('.page-title-container, #about-intro > *, .resume-button, #recent-posts > *');
    items.forEach((item, index) => {
        item.classList.add('stagger-load');
        item.style.animationDelay = `${index * 50}ms`;
    });
};

const routes = {
    '/': () => {
        const template = document.getElementById('about-template').content.cloneNode(true);
        const recentPostsContainer = template.querySelector('#recent-posts-container');
        const recentPosts = allContent.filter(item => item.type === 'Blog').slice(0, 3);
        recentPosts.forEach(post => recentPostsContainer.appendChild(createListItem(post)));
        return template;
    },
    '/projects': () => renderPage('project'),
    '/blog': () => renderPage('blog', 'blog-list-container', { showPreview: false }),
    '/about': () => renderPage('about', 'more-about-me'),
};

const router = async () => {
    const hash = window.location.hash.substring(1) || '/';
    updateActiveNav(hash);
    const blogPostMatch = hash.match(/^\/blog\/(.*)$/);
    
    mainContent.style.animation = 'fade-out 0.15s forwards';

    const handleFadeOutEnd = async () => {
        mainContent.innerHTML = ''; 

        if (blogPostMatch) {
            const postSlug = blogPostMatch[1];
            const post = allContent.find(p => p.url === `#/blog/${postSlug}`);
            mainContent.appendChild(post ? await renderBlogPost(post) : document.createTextNode('404 - Post not found.'));
        } else if (routes[hash]) {
            const content = routes[hash]();
            mainContent.appendChild(content);
        } else {
            mainContent.textContent = '404 - Page not found.';
        }
        mainContent.style.animation = '';
        applyStaggerAnimation(hash === '/');
    };

    mainContent.addEventListener('animationend', handleFadeOutEnd, { once: true });
};

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    router();
    
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#resume-download-btn')) {
            e.preventDefault();
            alert('will link soon!');
        }
    });

});
