<template>
  
  <div class="title-container">
    <h1>Dna Information Analytics aa</h1>
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
      padding: 20px 40px;
      text-align: center;
      border-radius: 20px;
      background-color: #19A7CE;
      border: 2px solid #F6F1F1;
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

  @media (max-width: 850px){
    .title-container{

      h1{
        font-size: 18px;
      }
    }
  }

</style>
