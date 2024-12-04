const menuBar = document.querySelector(".nav-menu-bar img");
const closeButton = document.querySelector(".sidebar-top-close");
const sidebar = document.querySelector("aside");
const overlay = document.querySelector(".overlay");

// * This event is to open the sidebar
menuBar.addEventListener("click", (event) => {
  sidebar.style.transform = "translateX(0%)";
  sidebar.classList.add("open");
  overlay.classList.add("open");
});

// * This event is to close the sidebar
closeButton.addEventListener("click", (event) => {
  sidebar.style.transform = "translateX(100%)";
  sidebar.classList.remove("open");
  overlay.classList.remove("open");
});

// * This event is to close the sidebar when it is pressed outside of the sidebar
window.addEventListener("click", (event) => {
  // Check if the sidebar is open and the click is outside of the sidebar
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(event.target) &&
    event.target !== menuBar
  ) {
    sidebar.style.transform = "translateX(100%)";
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }
});

// * Accordion handling
function toggleAccordion(element) {
  // Get all the accordions and the arrow elements
  const allAccordions = document.querySelectorAll(".accordion-content");
  const allAccordionArrow = document.querySelectorAll(".accordion-arrow");
  let arrow = element.querySelector(".accordion-arrow");

  // Toggle the active class on the accordion
  element.classList.toggle("active");
  let accordionContent = element.nextElementSibling;

  if (accordionContent.style.maxHeight) {
    // Accordion is open, so close it
    accordionContent.style.maxHeight = null;
    arrow.classList.remove("rotated");
  } else {
    // Accordion is closed, so open it
    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    arrow.classList.add("rotated");
  }
}
// * This function is for changing the language of the website
const langPills = document.querySelectorAll(".under-nav-lang-pill");
// Add click event listener to all language pills
langPills.forEach((pill) => {
  pill.addEventListener("click", (event) => {
    langPills.forEach((pill) => {
      pill.classList.remove("active-lang-pill");
    });
    pill.classList.add("active-lang-pill");
  });
});

// * This function is for the slider in the cards and reviews section
function initSlider(containerSelector) {
  const slider = document.querySelector(containerSelector);
  let isDown = false;
  let startX;
  let scrollLeft;

  if (!slider) return;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  // Prevent the slider from being active when the mouse leaves the slider
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 5;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// Initialize sliders for both containers
initSlider(".cards-container");
initSlider(".reviews-container");

// JavaScript to handle image click and create a modal
document.querySelectorAll(".latest-news-item img").forEach((img) => {
  img.addEventListener("click", () => {
    // Create modal overlay
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";

    // Create image element for the modal
    const modalImage = document.createElement("img");
    modalImage.classList.add("img-fluid");
    modalImage.src = img.getAttribute("data-img");

    const imageUrl = img.getAttribute("data-img");

    // Add inline style to overlay for background
    overlay.style.setProperty("--dynamic-bg", `url(${imageUrl})`);

    // Append close button and image to modal content
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalImage);

    // Append modal content to overlay
    overlay.appendChild(modalContent);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Close the modal when close button is clicked
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  });
});

// JavaScript to handle the toast messages
const toast = (message, type) => {
  // Create a toast element
  const toast = document.createElement("div");
  // Add the toast class and the type class
  toast.classList.add("toast", type);
  toast.innerText = message;

  // Append the toast to the body
  document.body.appendChild(toast);

  // Show the toast after 50ms
  setTimeout(() => {
    toast.classList.add("show");
  }, 50);

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 200);
  }, 3000);
};

// Form modal after the user successfully submits the form
const formModal = () => {
  // Create the modal element
  const modal = document.createElement("div");
  // Add the form-modal class to the modal
  modal.classList.add("form-modal");
  modal.innerHTML = `
    <div class="form-modal-content">
      <img src="./assets/CheckCircle.svg" alt="Success" class="img-fluid" />
      <h2>Form Submitted Successfully</h2>
      <p>Your order has been successfully placed, for further communication write to us in telegram</p>
      <button class="form-modal-close-btn">&times;</button>
    </div>
  `;
  // Append the modal to the body
  document.body.appendChild(modal);

  // Remove the modal after 5 seconds
  setTimeout(() => {
    document.body.removeChild(modal);
  }, 5000);
  // Close the modal when close button is clicked
  modal.querySelector(".form-modal-close-btn").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  // Close the modal when clicked outside of the modal
  document.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

// Validation of the form of the order page
const form = document.querySelector(".order-form form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the form fields
    const name = form.querySelector("#name").value;
    const email = form.querySelector("#email").value;
    const phone = form.querySelector("#phone").value.trim();
    const address = form.querySelector("#address").value;

    // Validation of the form fields
    if (!name || !email || !phone || !address) {
      toast("Please fill in all fields", "error");
      console.log("errror");
    } else if (name.length < 3) {
      toast("Name cannot be fewer than 3 characters!", "error");
    } else if (phone.length < 10 || phone.length > 11) {
      toast("Please enter a valid phone number", "error");
    } else if (!email.includes("@")) {
      toast("Please enter a valid email address", "error");
    } else if (address.length < 10) {
      toast("Please enter a valid address", "error");
    } else {
      toast("Order placed successfully", "success");
      // Show the form modal after successful submission
      formModal();
      // Clear the form fields after successful submission
      form.reset();
    }
  });
}

// JavaScript to handle the first latest-news slider
const latestNewsContainer = document.querySelector(".latest-news-container");
const rightArrow = document.querySelector(".arrow-right");
const leftArrow = document.querySelector(".arrow-left");

if (rightArrow) {
  rightArrow.addEventListener("click", () => {
    // Scroll the container to the right by 200px
    latestNewsContainer.scrollLeft += 200;
  });
}
if (leftArrow) {
  leftArrow.addEventListener("click", () => {
    // Scroll the container to the left by 200px
    latestNewsContainer.scrollLeft -= 200;
  });
}

// Add or subtract functionality for the quantity input
const quantitySubtract = document.querySelectorAll(".quantity-btn-subtract");
const quantityAdd = document.querySelectorAll(".quantity-btn-add");
if (quantityAdd) {
  quantityAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      const quantityInput = btn.previousElementSibling;
      quantityInput.innerText = parseInt(quantityInput.innerText) + 1;
    });
  });
}
if (quantitySubtract) {
  quantitySubtract.forEach((btn) => {
    btn.addEventListener("click", () => {
      const quantityInput = btn.nextElementSibling;
      if(parseInt(quantityInput.innerText) <= 0) return;
      quantityInput.innerText = parseInt(quantityInput.innerText) - 1;
    });
  });
}
