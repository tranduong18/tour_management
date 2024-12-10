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