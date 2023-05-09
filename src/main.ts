import "./style.css"

const form = document.querySelector('form');

form?.addEventListener("submit", async(e) => {
  e.preventDefault();

  const apiURL = import.meta.env.VITE_API_URL;
  if (!apiURL){
    throw new Error("VITE_API_URL is undefined.")
  }
  showSpinner();
  const formData = new FormData(form);

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: formData.get("prompt")
    })
  })

  if (response.ok){
    const { image } = await response.json();
    console.log(image)
    const result = document.querySelector("#result")!;
    result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    const error = await response.text();
    alert(error);
    console.error(error);
  }
  hideSpinner();
})

function showSpinner() {
  const button = document.querySelector('button')!;
  button.disabled = true;
  button.innerHTML = `Generating... <span class="spinner">🧠</span>`
}

function hideSpinner() {
  const button = document.querySelector('button')!;
  button.disabled = false;
  button.innerHTML = "Generate"
}