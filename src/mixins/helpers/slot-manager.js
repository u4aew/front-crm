import Helper from '@/core/utils/helper'

/** Миксин для работы со слотами
 * @hasSlot метод для проверки существования слота
 */
export default {
  methods: {
    hasSlot (slotName) {
      return Helper.isDefined(this.$slots[slotName])
    }
  }
}
