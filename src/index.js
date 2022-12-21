// write your code here


//////////////////////////////////
////// render ramen function /////
//////////////////////////////////
function fetchingthings(){
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(ramen => {
    ramen.forEach(renderRamen)
    render1stImage(ramen[0])
})
}
fetchingthings()
/////////// render first image ///////
function render1stImage(newRamen){
    const detailImg = document.querySelector('.detail-image');
    const detailH2 = document.querySelector('.name');
    const detailRestaurant = document.querySelector('.restaurant');
    const detailRating = document.querySelector('#rating-display');
    const detailComment = document.querySelector('#comment-display');
    
    console.log(newRamen.id)
    detailImg.src = newRamen.image;
    detailH2.textContent = newRamen.name;
    detailRestaurant.textContent = newRamen.restaurant;
    detailRating.textContent = newRamen.rating;
    detailComment.textContent = newRamen.comment;
    

}
const div = document.querySelector('#ramen-detail')
const h6 = document.createElement('h6');
h6.className = 'tagId';
h6.style.display = 'none'; 
div.append(h6);


function renderRamen(newRamen){
    
    const imageMenu = document.querySelector('#ramen-menu')
    const img = document.createElement('img');
    img.className = 'image-of-ramen'
    img.src = newRamen.image;
    imageMenu.append(img);

    const detailImg = document.querySelector('.detail-image');
    const detailH2 = document.querySelector('.name');
    const detailRestaurant = document.querySelector('.restaurant');
    const detailRating = document.querySelector('#rating-display');
    const detailComment = document.querySelector('#comment-display');
    const detailId = document.querySelector('.tagId');
    
    
    
    img.addEventListener('click', (e) => {
        
        detailImg.src = e.target.src;
        detailH2.textContent = newRamen.name;
        detailRestaurant.textContent = newRamen.restaurant;
        detailRating.textContent = newRamen.rating;
        detailComment.textContent = newRamen.comment;
        detailId.textContent = newRamen.id;
        
        
        

        
    })
    
};


//////////////////////////////////
////// new ramen form ////////////
//////////////////////////////////
const ramenBtn = document.querySelector('#new-ramen');

ramenBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const objRamen = {};

    const name = e.target.name.value;
    const restaurant = e.target.restaurant.value;
    const image = e.target.image.value;
    const rating = e.target.rating.value;
    const comment = document.querySelector('#new-comment').value;

    objRamen.name = name;
    objRamen.restaurant = restaurant;
    objRamen.image = image;
    objRamen.rating = rating;
    objRamen.comment = comment;
    
    
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(objRamen)
    })
    .then(res => {
        if(res.ok){
            res.json();
        } else {
            console.log('ERROR')
        }
    })
    


    renderRamen(objRamen);
    e.target.reset();
})



//////////////////////////////////
        ///////// edit rating form ///////
        //////////////////////////////////
        const ratingBtn = document.querySelector('#edit-ramen')
        ratingBtn.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('clicked!')
                const objRating ={}
                const newRating = e.target.rating.value;
                const newComment = e.target['new-comment'].value;

                objRating.id = document.querySelector('.tagId').textContent;
                
                objRating.rating = newRating;
                objRating.comment = newComment;
                const detailComment = document.querySelector('#comment-display');
                const detailRating = document.querySelector('#rating-display')
                detailComment.textContent = newComment;
                detailRating.textContent = newRating;
                console.log(objRating)
                
                fetch(`http://localhost:3000/ramens/${objRating.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/json',
                        Accept: 'Application/json'
                    },
                    body: JSON.stringify(objRating)
                })
                .then(res => res.json())
                //.then(fetchingthings);
                    
                
                
                e.target.reset();
            })