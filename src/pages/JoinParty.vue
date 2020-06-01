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
                  :error="wrong_code"
               />
            </div>
            <transition name="slide-left" mode="out-in">
               <div v-if="input_is_open" class="button">
                  <BaseButtonWithIcon
                     :width="48"
                     :height="48"
                     @click="checkPartyCode"
                  >
                     <BaseIcon
                        :width="13"
                        :height="17"
                        viewBox="0 0 13 17"
                        color="white"
                     >
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
import { mapActions, mapGetters } from 'vuex'

export default {
   data() {
      return {
         input_code: '',
         input_is_open: false,
         submitted: false,
         verifying: false
      }
   },
   computed: {
      placeholder() {
         if (!this.isPartyCode() && this.submitted) {
            return 'Codice errato'
         }
         return 'Codice'
      },
      wrong_code() {
         if (!this.isPartyCode() && this.submitted) {
            return true
         }
         return false
      }
   },
   methods: {
      ...mapActions('party', ['joinParty']),
      ...mapGetters('party', ['isPartyCode']),
      displayButton() {
         this.input_is_open = true
      },
      hideButton() {
         this.input_is_open = false
      },
      checkPartyCode() {
         this.verifying = true
         this.joinParty(this.input_code)
         this.submitted = true
         this.input_code = ''
      }
   },
   created() {
      if (this.isPartyCode()) {
         this.$router.push({ name: 'GuestPartyHome' })
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
