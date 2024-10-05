const getById = (id)=>{
    return document.getElementById(id);
}

const post_container = getById("post_container");
const markAsReadContainer = getById("markAsReadContainer");
const markAsReadCounter = getById("markAsReadCounter");
const searchPosts = getById("searchPosts");
const searchPostsBtn = getById("searchPostsBtn");
let counter = 0;


const handleSearchByCategory = ()=>{
    
    const category = searchPosts.value.trim();
    loadBySearch(category);
     


}


const loadBySearch = async(search)=>{

    let data = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`)
    data = await data.json();
    let posts = data.posts;
    console.log(posts)
    displayAllPost(posts);
}

const loadAllPost = async()=>{
    let data = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    data = await data.json();
    let posts = data.posts;
    // console.log(posts);
    displayAllPost(posts);
    
}

/**
 * 
 * {
    "id": 101,
    "category": "Comedy",
    "image": "https://i.ibb.co/0QRxkd5/pexels-jan-kop-iva-3525908.jpg",
    "isActive": true,
    "title": "10 Kids Unaware of Their Costume",
    "author": {
        "name": "John Doe"
    },
    "description": "It is one thing to subject yourself to a costume mishap",
    "comment_count": 560,
    "view_count": 1568,
    "posted_time": 5
}
 * 
 * 
 */
const markAsRead = (title, views)=>{

    counter++;
    markAsReadCounter.textContent = counter;

    const div = document.createElement('div');
    div.innerHTML = `<div class="flex p-4 bg-white rounded-2xl items-center justify-around">
                    <p>
                     ${title}
                    </p>

                    <div class="flex gap-2  items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      
                      <p class="text-sm text-gray-500">${views}</p>
                    </div>
                  </div>
                `

        markAsReadContainer.append(div);
}


const displayAllPost = (posts)=>{
    post_container.innerHTML = "";

    posts.map((post)=>{
        console.log(post.category);
        console.log(post.title);
        console.log(post.author.name);
        console.log(post.description);
        console.log(post.comment_count);
        console.log(post.view_count);
        console.log(post.posted_time);
        console.log("---------------------------------");

        const div = document.createElement("div");
        div.innerHTML = `
         <div class="flex items-start gap-4 bg-gray-100 sm:p-4 md:p-8 lg:p-12 rounded-2xl">
              <!-- image -->
               <div>
                <div class="w-24 h-24 relative">
                  <img class="w-full h-full object-cover rounded-lg" src="${post.image}" alt="">
                  <img class="absolute top-[-8px] right-[-8px] w-5 h-5 " src="./images/${post.isActive ? 'avtive.png' : 'red.png'}" alt="">
                 </div>
                 
               </div>
               <!-- text -->
                <div class="flex flex-col gap-4">
                    <!-- category -->
                     <div class="flex items-center gap-2">
                      <p class="text-sm text-gray-400">#${post.category}</p>
                      <p class="text-sm text-gray-400">Author: ${post.author.name}</p>
                     </div>
                     <!-- title -->
                      <h1 class="text-2xl font-bold">${post.title}</h1>
                      <p class="text-gray-400">${post.description}</p>

                      <hr>

                      <!-- comment -->
                     <div class="flex justify-between items-center">
                      <div class="flex items-center gap-4">
                        <div class="flex gap-2  items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                          </svg>
                          <p class="text-sm text-gray-500">${post.comment_count}</p>
                        </div>
                        <div class="flex gap-2  items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                          
                          <p class="text-sm text-gray-500">${post.view_count}K</p>
                        </div>
                        <div class="flex gap-2  items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          
                          
                          <p class="text-sm text-gray-500">${post.posted_time} Min</p>
                        </div>
                     </div>
                     <div type="button"  onclick="markAsRead('${post.description}', '${post.view_count}')" class="cursor-pointer  btn border-none shadow-none bg-none">
                      <img class="w-8 h-8 " src="./images/chat.png" alt="">
                     </div>
                     </div>

                </div>
            </div>
        
        `

        post_container.appendChild(div);


    })
}



loadAllPost();