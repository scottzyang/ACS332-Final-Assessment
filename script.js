
			// All 100 color swatches has a CSS custom property assigne to it.
			// You can use this color each swatch with a unique color.

			// --color-sample-0 : red
			// --color-sample-1 : green
			// ...
			// --color-sample-99 : blue

			// make some swatches
      const swatchCount = 100;

      for (let i = 0; i < swatchCount; i += 1) {
        const hue = i * (360 / swatchCount);
        const saturation = 100;
        const lightness = 50;

        const swatch = `
          <div
            class="swatch add-to-cart color-${i}"
            data-color="Color ${i}"
            data-price="${(Math.random() * 10).toFixed(2)}"
            style="background-color: hsl(${hue}, ${saturation}%, ${lightness}%);"></div>`;
        document.querySelector('.swatches').innerHTML += swatch;
      }


      const addForm = document.getElementById('add-form')
      const inputName = document.getElementById('name')
      const inputPrice = document.getElementById('price')
      const itemsList = document.getElementById('items')
      const divTotal = document.getElementById('total')

			function handleClicks(e) {
				if (e.target.matches('.swatch')) {
					const color = e.target.dataset.color
					const price = e.target.dataset.price
					addToCart(color, price)
				}
			}

			document.querySelector('body').addEventListener('click', handleClicks)

      const cart = []

      document.querySelector('body').addEventListener('submit', function(e){
        e.preventDefault()
        const name = inputName.value
        const price = inputPrice.value
        addToCart(name, price)
        showCart()
      })

			document.querySelector('body').addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('remove')) {
          console.log(e.target.dataset.name)
          removeFromCart(e.target.dataset.name)
        } else if (e.target && e.target.classList.contains('add-one')) {
          addToCart(e.target.dataset.name)
        } else if (e.target && e.target.classList.contains('remove-one')) {
          removeFromCart(e.target.dataset.name, 1)
        }
			})

      document.querySelector('body').addEventListener('input', function(e) {
        if (e.target.matches('.update')) {
          const qty = parseInt(e.target.value)
          const name = e.target.dataset.name
          updateCart(name, qty)
        }
      })

      function addToCart(name, price) {
        for (let i = 0; i < cart.length; i += 1) {
          if (cart[i].name === name) {
            cart[i].qty += 1
            showCart()
            return true
          }
        }
        cart.push({ name, price, qty: 1})
        showCart()
      }

      function removeFromCart(name, qty = 0) {
        console.log(name, qty)
        for (let i = 0; i < cart.length; i += 1) {
          if (cart[i].name === name) {
            if (qty) {
              let newQty = cart[i].qty - qty
              if (newQty > 0) {
                cart[i].qty = newQty
              } else {
                cart.splice(i, 1)
              }
            } else {
              cart.splice(i, 1)
            }
          }
        }

        showCart()
      }

      function showCart() {
        let str = ''
        for (let i = 0; i < cart.length; i += 1) {
					// Shopping cart list item!
          str += `<li class="cart-item">
            <span class="item-description">
							<span>${cart[i].name}</span>
							<span>${cart[i].price}</span>
							<span>each x</span>
							<span>${cart[i].qty}</span>
							<span> = </span>
							<span>${(cart[i].qty * cart[i].price).toFixed(2)}</span>
						</span>

						<span class="cart-modifier">
							<input class="update" data-name="${cart[i].name}" type="number" value="${cart[i].qty}">
							<button class="add-one" data-name="${cart[i].name}"> + </button>
							<button class="remove-one" data-name="${cart[i].name}"> - </button>
							<button class="remove" data-name="${cart[i].name}">remove</button>
						</span>
          </li>`
        }
        itemsList.innerHTML = str
        divTotal.innerHTML = getTotal()
      }

      function getTotal() {
        let total = 0
        for (let i = 0; i < cart.length; i += 1) {
          total += cart[i].price * cart[i].qty
        }
        return total.toFixed(2)
      }

      function updateCart(name, qty) {
        for (let i = 0; i < cart.length; i += 1) {
          if (cart[i].name === name) {
            cart[i].qty = qty
            showCart()
            return true
          }
        }
        return false
      }

      showCart()
      getTotal()
