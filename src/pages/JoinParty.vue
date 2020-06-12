<template>
   <div class="join-party fullscreen" @click.self="hideButton">
      <div class="input-window">
         <div class="title">Inserisci il codice del party</div>
         <div class="input-with-icon">
            <div class="input">
               <BaseInput
                  @focusin="displayButton"
                  :placeholder="placeholder"
                  v-model="input_code"
                  :value="input_code"
                  :error="!code_is_correct"
               />
            </div>
            <transition name="slide-left" mode="out-in">
               <div v-if="input_is_open" class="button">
                  <BaseButtonWithIcon :width="48" :height="48" @click="checkPartyCode">
                     <BaseIcon :width="13" :height="17" viewBox="0 0 13 17" color="white">
                        <Arrow />
                     </BaseIcon>
                  </BaseButtonWithIcon>
               </div>
            </transition>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
   data() {
      return {
         input_code: '',
         input_is_open: false,
         code_is_correct: true
      }
   },
   computed: {
      ...mapState('party', ['party_code']),
      ...mapState('user', ['access_token']),
      placeholder() {
         if (!this.code_is_correct) {
            return 'Codice errato'
         }
         return 'Codice'
      }
   },
   watch: {
      access_token() {
         this.$router.push({ name: 'GuestPartyHome', params: { id: this.party_code } })
      }
   },
   methods: {
      ...mapActions('party', ['joinParty', 'updateAccessToken']),
      displayButton() {
         this.input_is_open = true
      },
      hideButton() {
         this.input_is_open = false
      },
      async checkPartyCode() {
         this.code_is_correct = await this.joinParty(this.input_code)
         if (this.code_is_correct) {
            this.updateAccessToken()
         }
         this.input_code = ''
      }
   },
   created() {
      if (this.party_code != null) {
         this.$router.push({ name: 'GuestPartyHome', params: { id: this.party_code } })
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.join-party
   align-items: center
   background-color: map-get($colors, 'background')
   display: flex
   flex-direction: column
   justify-content: center
   .title
      color: white
      font-size: 24px
      margin: 20px
   .input-with-icon
      align-items: center
      display: flex
      justify-content: center
   .input
      margin: 0px 20px 0px 20px
.button
   box-sizing: border-box
   width: 48px

.slide-left-enter-active,
.slide-left-leave-active
   transition: all .6s
.slide-left-enter,
.slide-left-leave-to
   opacity: 0
   overflow: visible
   transform: translate(100px, 0px)
   width: 0px
</style>
