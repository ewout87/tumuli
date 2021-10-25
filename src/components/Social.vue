<template>   
    <div class="social">
        <g-link href="https://www.instagram.com/tumulispotter/" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></g-link>
    </div>
</template>

<style>
.social {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 3rem 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #130f40;
}

.social-icon {
    margin: 0 auto;
}

.social-icon i:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.5);
}

.social-icon i {
    color: #fff;
    font-size: 2rem;
}
</style>