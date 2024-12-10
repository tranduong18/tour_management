// Xóa bản ghi
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0){
    listButtonDelete.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const link = button.getAttribute("button-delete");
            const confirmed = confirm("Bạn có chắc chắn muốn xóa không?");

            if(confirmed){
                fetch(link, {
                    method: "PATCH"
                })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();                }
                })
            }
        });
    });
}
// Hết Xóa bản ghi

// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0) {
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("link");
            fetch(link, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End Button Change Status

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const imagePreviewContainer = uploadImage.querySelector(".image-preview-container");

    uploadImageInput.addEventListener("change", () => {
        const files = uploadImageInput.files;
        if (files) {
            imagePreviewContainer.innerHTML = ''; // Xóa toàn bộ ảnh cũ khi chọn ảnh mới

            for (const file of files) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.classList.add('image-preview');
                    img.style.marginRight = '10px';
                    imagePreviewContainer.appendChild(img);
                };

                reader.readAsDataURL(file);
            }
        }
    });
}

// End Upload Image

// Toggle Password
const passInput = document.querySelector("#passwordInput");
if(passInput){
    const buttonTogglePass = document.querySelector("#togglePassword");
    const eyeIcon = buttonTogglePass.querySelector("[icon]");

    if (buttonTogglePass) {
        buttonTogglePass.addEventListener("click", () => {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }
}
// End Toggle Password

// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    let time = showAlert.getAttribute("show-alert") || 3000;
    time = parseInt(time);

    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, time);
}
// End show-alert