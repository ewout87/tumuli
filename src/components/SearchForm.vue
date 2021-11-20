<template> 
    <div>
        <form class="address-form">
            <input type="text" placeholder="adres" :address="address">
            <input type="text" placeholder="postcode of plaats" :code="code">
            <button class="button" @click.prevent="getLocation()">Bereken Route</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            address: '',
            code: '',
            location: []
        }
    },
    methods: {
        async getLocation(){
        this.location = []

        try {
            const data = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=` + this.address + ` ` + this.code + ` Belgie&format=json`
            )
            this.location.push(data.data[0].lat, data.data[0].lon);
            } 
            catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
  .address-form {
    padding: 1rem 2rem;
    margin-bottom: 1rem;
  }

  .address-form .button {
    background-color: rgb(216, 122, 0);
    color: #fff;
    padding: .5rem 1.5rem;
    margin: 0 auto;
    text-align: center
  }
</style>