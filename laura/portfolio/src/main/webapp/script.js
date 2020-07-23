// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random image to the page.
 */
function randomMood() {
  // Pick a random index.
  const idx = Math.floor(Math.random() * 4) + 1;

  const imgUrl = "images/q" + idx + ".jpg";

  // Create the image element.
  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;
  imgElement.height = "500";

  // Put it in a container.
  const imageContainer = document.getElementById('mood-container');
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
}

function showGallery() {
    const gallery = document.getElementById('gallery-container');
    for (var i = 0; i < 8; ++ i) {
        /* Add each picture to gallery by creating indep elements */
        const imgElem = document.createElement('img');
        imgElem.src = "images/film/"+i+".jpg";
        imgElem.height = "150";
        
        gallery.appendChild(imgElem);
    }
}

/* Create new element with the messages recieved from the ./data servlet in a json;
     is called when the page is reloaded by the _onload_ prop of the html body */
async function printServletMsg() {
    const limit = document.getElementById('max-comments-limit').value;
    const response = await fetch("/data?com-limit=" + limit);
    const parsed_json = await response.json();
    
    const comment_zone = document.getElementById('servlet-msg');
    comment_zone.innerHTML = "";
    for (comm of parsed_json) {
        const elem = document.createElement('p');
        elem.innerText = comm;
        elem.classList.add("comment-zone");
        comment_zone.appendChild(elem);
    }

    if (comment_zone.innerHTML == "") {
        comment_zone.innerHTML = "<p class=\"comment-zone\">No comments to display :(. Be the first one to leave a comment!</p>";
    }
}

async function deleteAllComments() {
    await fetch(new Request('/delete-data', {method: 'POST'}));
    await printServletMsg();
}