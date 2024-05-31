document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart")
    const cartButton = document.getElementById("cartButton")
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"))
    const cartItemsList = document.getElementById("cartItems")
    const cartTotal = document.getElementById("cartTotal")
    const checkoutButton = document.getElementById("checkoutButton")

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const courseTitle = this.getAttribute("data-title")
            const courseImage = this.getAttribute("data-image")
            const coursePrice = parseFloat(this.getAttribute("data-price"))
            addToCart(courseTitle, courseImage, coursePrice)
        })
    })

    cartButton.addEventListener("click", function () {
        showCart()
        cartModal.show()
    })

    checkoutButton.addEventListener("click", function () {
        window.location.href = "checkout.html"
    })

    function addToCart(courseTitle, courseImage, coursePrice) {
        let cart = JSON.parse(localStorage.getItem("cart")) || []
        const existingItem = cart.find((item) => item.title === courseTitle)

        if (existingItem) {
            alert(`${courseTitle} is already in your cart.`)
        } else {
            cart.push({ title: courseTitle, image: courseImage, price: coursePrice })
            localStorage.setItem("cart", JSON.stringify(cart))
            alert(`${courseTitle} has been added to your cart.`)
        }
    }

    function showCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || []
        cartItemsList.innerHTML = ""
        let total = 0
        cart.forEach((item, index) => {
            total += item.price
            const listItem = document.createElement("li")
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center")
            listItem.innerHTML = `
                                <div>
                                    <img src="${item.image}" alt="${
                item.title
            }" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                                    ${item.title} - $${item.price.toFixed(2)}
                                </div>
                                <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">Remove</button>
                            `
            cartItemsList.appendChild(listItem)
        })
        cartTotal.innerText = total.toFixed(2)

        document.querySelectorAll(".remove-from-cart").forEach((button) => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index")
                removeFromCart(index)
            })
        })
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || []
        cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cart))
        showCart()
    }
})
document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar")
    const coursesContainer = document.getElementById("coursesContainer")
    const courses = coursesContainer ? Array.from(coursesContainer.getElementsByClassName("col-md-4")) : []
    if (searchBar) {
        searchBar.addEventListener("keyup", function () {
            if (!courses.length) {
                return
            }
            const searchText = searchBar.value.toLowerCase()
            courses.forEach((course) => {
                const courseTitle = course.querySelector(".card-title").textContent.toLowerCase()
                if (courseTitle.includes(searchText)) {
                    course.style.display = ""
                } else {
                    course.style.display = "none"
                }
            })
        })
    }
})
document.addEventListener("DOMContentLoaded", () => {
    // Event listener for sorting dropdown
    const sortPrice = document.getElementById("sortPrice")
    if (sortPrice) {
        sortPrice.addEventListener("change", sortCoursesByPrice)
    }
})

function sortCoursesByPrice() {
    const sortValue = document.getElementById("sortPrice").value
    const coursesContainer = document.getElementById("coursesContainer")
    const courses = Array.from(coursesContainer.getElementsByClassName("col-md-4"))

    courses.sort((a, b) => {
        const priceA = parseInt(a.getAttribute("data-price"))
        const priceB = parseInt(b.getAttribute("data-price"))

        if (sortValue === "low-to-high") {
            return priceA - priceB
        } else if (sortValue === "high-to-low") {
            return priceB - priceA
        } else {
            return 0
        }
    })

    // Clear the current course display
    while (coursesContainer.firstChild) {
        coursesContainer.removeChild(coursesContainer.firstChild)
    }

    // Append sorted courses
    courses.forEach((course) => {
        coursesContainer.appendChild(course)
    })
}

function filterCourses() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase()
    const courses = document.getElementById("coursesContainer").getElementsByClassName("col-md-4")

    Array.from(courses).forEach((course) => {
        const title = course.getElementsByClassName("card-title")[0].innerText.toLowerCase()
        if (title.includes(searchTerm)) {
            course.style.display = ""
        } else {
            course.style.display = "none"
        }
    })
}

//subscribe-button click event
const button = document.getElementById("subscribe-button")
button.addEventListener("click", subscribe)

function subscribe() {
    const email = document.getElementById("subscribe-email").value
    if (!email) {
        return
    }

    alert("Subscribed successfully!")
}
const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
  item.addEventListener('click', function() {
    switchers.forEach(item => item.parentElement.classList.remove('is-active'))
    this.parentElement.classList.add('is-active')
  })
})
