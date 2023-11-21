document.addEventListener("DOMContentLoaded", function () {
    let sendButton = document.querySelector('#search-send')

    const getData = () => {
        const input = document.getElementById('search-input')

        const endpointUrl = `https://api.github.com/users/${input.value}`

        const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        }

        fetch(endpointUrl, options)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            renderData(data)
        })
        .catch(error => {
            console.error('Erro na requisição:', error)
            alert('perfil não encontrado')
        })

    input.value = ''
    
}

    const renderData = (data) => {
        const { name, login, avatar_url, bio, following, followers, public_repos, mail, html_url } = data

        const profileElement = document.querySelector('#profile')
        const nameElement = document.querySelector('#name')
        const loginElement = document.querySelector('#login')
        const bioElement = document.querySelector('#bio')
        const reposElement = document.querySelector('#repos')
        const followingElement = document.querySelector('#following')
        const followersElement = document.querySelector('#followers')
        const mailElement = document.querySelector('#mail')
        const followElement = document.querySelector('#follow')
        const iconElement = document.querySelector('#icon')

        profileElement.style.backgroundImage = `url(${avatar_url})`
        loginElement.innerHTML = `@${login}`
        mailElement.href = mail
        followElement.href = html_url
        nameElement.innerHTML = name
        bioElement.innerHTML = bio
        reposElement.innerHTML = public_repos
        followersElement.innerHTML = followers
        followingElement.innerHTML = following
        iconElement.href = html_url
    }
    sendButton.addEventListener("click", getData)
})
