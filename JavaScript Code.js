const form = document.getElementById("form");
const thumbnailsDiv = document.getElementById("thumbnails");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = event.target.url.value;
  const videoId = getVideoIdFromUrl(url);
  if (!videoId) {
    // display error message
    errorMessage.style.display = "block";
    thumbnailsDiv.innerHTML = "";
    return;
  }
  const thumbnailUrls = getThumbnailUrls(videoId);
  displayThumbnails(thumbnailUrls);
  errorMessage.style.display = "none";
});

function getVideoIdFromUrl(url) {
  const pattern = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|shorts\/|live\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?=[^\w-]|$)(?![?&](?:feature|annotation|src_vid|list)(?:feature=share)=)/;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  }
  return null;
}

function getThumbnailUrls(videoId) {
  if (!videoId) {
    return [];
  }
  return [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`,
    `https://img.youtube.com/vi/${videoId}/1.jpg`,
    `https://img.youtube.com/vi/${videoId}/2.jpg`,
    `https://img.youtube.com/vi/${videoId}/3.jpg`,
  ];
}

function displayThumbnails(thumbnailUrls) {
  thumbnailsDiv.innerHTML = "";

  // Create H3 tag for first five thumbnails
  const h3First = document.createElement("h3");
  h3First.classList.add("h3-heading");
  h3First.textContent = "All the Thumbnails of the Video";
  thumbnailsDiv.appendChild(h3First);

  // Display first five thumbnails with their respective titles
  for (let i = 0; i < 5; i++) {
    const url = thumbnailUrls[i];

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");

    const title = document.createElement("p");
    title.classList.add("thumbnail-title");
    if (url.includes("maxresdefault")) {
      title.textContent =
        "» High Definition Thumbnail of the video (1280x720)";
    } else if (url.includes("sddefault")) {
      title.textContent = "» SD Thumbnail of the video (640x480)";
    } else if (url.includes("hqdefault")) {
      title.textContent = "» HQ Thumbnail of the video (480x360)";
    } else if (url.includes("mqdefault")) {
      title.textContent = "» MQ Thumbnail of the video (320x180)";
    } else if (url.includes("default")) {
      title.textContent = "» Default Thumbnail (120x90)";
    } else {
      title.textContent = "» Screenshot from Video (120x90)";
    }
    thumbnailDiv.appendChild(title);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("thumbnail-img-container");
    const img = document.createElement("img");
    img.src = url;
    img.onload = function () {
      const resolutionDiv = document.createElement("div");
      resolutionDiv.classList.add("thumbnail-resolution");
      resolutionDiv.textContent = `${img.naturalWidth}x${img.naturalHeight}`;
      imgContainer.appendChild(resolutionDiv);
    };
    imgContainer.appendChild(img);
    thumbnailDiv.appendChild(imgContainer);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "";
    downloadLink.textContent = "Download";
    thumbnailDiv.appendChild(downloadLink);

    thumbnailsDiv.appendChild(thumbnailDiv);
  }

  // Create H3 tag for last three thumbnails
  const h3Second = document.createElement("h3");
  h3Second.classList.add("h3-heading");
  h3Second.textContent = "3 Screenshots from the Video";
  thumbnailsDiv.appendChild(h3Second);

  // Display last three thumbnails with the same title and updated numbers
  for (let i = 5; i < 8; i++) {
    const url = thumbnailUrls[i];

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");

    const title = document.createElement("p");
    title.classList.add("thumbnail-title");
    if (i === 5) {
      title.textContent = "» 1 Screenshot from Video (120x90)";
    } else if (i === 6) {
      title.textContent = "» 2 Screenshot from Video (120x90)";
    } else {
      title.textContent = "» 3 Screenshot from Video (120x90)";
    }
    thumbnailDiv.appendChild(title);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("thumbnail-img-container");
    const img = document.createElement("img");
    img.src = url;
    img.onload = function () {
      const resolutionDiv = document.createElement("div");
      resolutionDiv.classList.add("thumbnail-resolution");
      resolutionDiv.textContent = `${img.naturalWidth}x${img.naturalHeight}`;
      imgContainer.appendChild(resolutionDiv);
    };
    imgContainer.appendChild(img);
    thumbnailDiv.appendChild(imgContainer);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "";
    downloadLink.textContent = "Download";
    thumbnailDiv.appendChild(downloadLink);

    thumbnailsDiv.appendChild(thumbnailDiv);
  }
}
