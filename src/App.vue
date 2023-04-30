<template>
        <div class="title-container">
        <h1>Dna Information Analytics</h1>
      </div>

  <div class="container">
    <section class="section-one-container">

      <analytics></analytics>
    </section>
      
  </div>

</template>

<script setup>

  import Analytics from "./components/Analytics.vue"
  
</script>

<style scoped lang="scss">
  .title-container{
    display: flex;
    justify-content: center;
    color: white;
    background-color: #146C94;
    margin-bottom: 5%;

    h1{
      padding: 15px;
      text-align: center;
    }
  }

  .container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .section-one-container{
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
</style>
