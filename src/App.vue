<template>

  <div class="container">

    <section class="section-one-container">
      <div class="title-container">
        <h1>Dna Information Analytics</h1>
      </div>
    </section>
    
    <section class="section-two-container">
      <analytics></analytics>
    </section>
      
  </div>

</template>

<script setup>

  import Analytics from "./components/Analytics.vue"
  

</script>

<style scoped lang="scss">
  .container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    section{
      height: 100vh;
      width: 100vw;
      scroll-snap-align: start;
      padding: 1rem;
      border-bottom: 3px solid red;
	    position: relative;

      .title-container{
        display: flex;
        justify-content: center;

        h1{
          border: 1px solid red;
          padding: 15px 30px;
          border-radius: 10px;
        }
      }
    }

    .section-two-container{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

</style>
