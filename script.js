// DOM Elements
const postInput = document.querySelector('input[placeholder="What\'s happening?"]');
const postButton = document.querySelector('.bg-black.text-white');
const postSubmitButton = document.querySelector('.bg-blue-500');
const postsContainer = document.querySelector('.flex.flex-col.border-x.border-gray-300');

// Sample user data
const currentUser = {
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'images/profile.png'
};

// Sample posts data
let posts = [
    {
        id: 1,
        user: {
            name: 'Elon Musk',
            username: '@elonmusk',
            avatar: 'profile/Elon.jpg'
        },
        content: 'From DogeDesigner',
        media: {
            type: 'video',
            url: 'post-video.mp4'
        },
        stats: {
            likes: 3600,
            retweets: 17000,
            replies: 62000,
            views: 1200000
        },
        timestamp: '6h',
        isLiked: false,
        isRetweeted: false
    },
    {
        id: 2,
        user: {
            name: 'Delhi Police',
            username: '@DelhiPolice',
            avatar: 'profile/DelhiPolice.jpg'
        },
        content: 'Your safety is our top priority. Report any suspicious activity immediately. Dial 112 🚨',
        media: {
            type: 'image',
            url: 'posts/delhi-police-banner.jpg'
        },
        stats: {
            likes: 830,
            retweets: 3200,
            replies: 9500,
            views: 200000
        },
        timestamp: '3h',
        isLiked: false,
        isRetweeted: false
    }
];

// Function to create a new post
function createPost(content, media = null) {
    const newPost = {
        id: posts.length + 1,
        user: currentUser,
        content,
        media,
        stats: {
            likes: 0,
            retweets: 0,
            replies: 0,
            views: 0
        },
        timestamp: 'now',
        isLiked: false,
        isRetweeted: false
    };
    posts.unshift(newPost);
    renderPosts();
}

// Function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Function to render posts
function renderPosts() {
    const postsHTML = posts.map(post => `
        <div class="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-4 mt-6">
            <div class="flex items-start space-x-4">
                <div>
                    <img src="${post.user.avatar}" alt="Profile" class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80">
                </div>
                <div class="flex-1">
                    <div class="flex items-center space-x-2">
                        <span class="font-bold text-gray-800 cursor-pointer hover:underline">${post.user.name}</span>
                        <span class="text-sm text-gray-500">${post.user.username} · ${post.timestamp}</span>
                    </div>
                    <p class="mt-1 text-gray-700">${post.content}</p>
                    ${post.media ? `
                        <div class="mt-2">
                            ${post.media.type === 'video' ? `
                                <video class="w-full rounded-lg" controls>
                                    <source src="${post.media.url}" type="video/mp4">
                                </video>
                            ` : `
                                <img src="${post.media.url}" alt="Post media" class="w-full rounded-lg">
                            `}
                        </div>
                    ` : ''}
                    <div class="flex justify-between text-gray-500 text-sm mt-4">
                        <button class="flex items-center gap-1 hover:text-blue-500" onclick="replyToPost(${post.id})">
                            <img src="icons/reply.svg" alt="Reply" class="h-5 w-5">
                            <span>${formatNumber(post.stats.replies)}</span>
                        </button>
                        <button class="flex items-center gap-1 hover:text-green-500" onclick="retweetPost(${post.id})">
                            <img src="icons/retweet.svg" alt="Retweet" class="h-5 w-5">
                            <span>${formatNumber(post.stats.retweets)}</span>
                        </button>
                        <button class="flex items-center gap-1 hover:text-red-500" onclick="likePost(${post.id})">
                            <img src="icons/${post.isLiked ? 'like-filled' : 'like'}.svg" alt="Like" class="h-5 w-5">
                            <span>${formatNumber(post.stats.likes)}</span>
                        </button>
                        <button class="flex items-center gap-1 hover:text-blue-500" onclick="sharePost(${post.id})">
                            <img src="icons/share.svg" alt="Share" class="h-5 w-5">
                            <span>${formatNumber(post.stats.views)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    const showPostsButton = document.querySelector('.h-10.w-full.mt-2.mb-4');
    showPostsButton.insertAdjacentHTML('afterend', postsHTML);
}

// Event Listeners
postButton.addEventListener('click', () => {
    postInput.focus();
});

postSubmitButton.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content) {
        createPost(content);
        postInput.value = '';
    }
});

// Post interaction functions
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.isLiked = !post.isLiked;
        post.stats.likes += post.isLiked ? 1 : -1;
        renderPosts();
    }
}

function retweetPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.isRetweeted = !post.isRetweeted;
        post.stats.retweets += post.isRetweeted ? 1 : -1;
        renderPosts();
    }
}

function replyToPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.stats.replies++;
        renderPosts();
    }
}

function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.stats.views++;
        renderPosts();
    }
}

// Initialize
renderPosts();
