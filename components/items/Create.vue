<script setup lang="ts">
  import { useItemStore } from '~/stores/firestore'
  import type { dndItem } from '~/types/dnditem';
  const { createItem } = useItemStore()

  // form bindings
  const itemInputObj = ref<dndItem>({ name: '', type: '', subtype: '', base: [], rarity: 'common', price: 0, desc: '', imageUrl: '', src: '', attuned: false })
  const itemInputError = ref<{[key: string]: string|undefined}>({ name: undefined, type: undefined, subtype: undefined, base: undefined, rarity: undefined, price: undefined })
  const imageUpload = ref()

  // Selectable values
  const rarities = [{label:'mundane',color:'grey'},{label:'common',color:'white'},{label:'uncommon',color:'#1fc43d'},{label:'rare',color:'#4990e2'},{label:'very rare',color:'#9810e1'},{label:'legendary',color:'#fea42f'},{label:'artifact',color:'#be8a78'}]
  const simpleMeleeWeapons = ["club", "dagger", "greatclub", "handaxe", "javelin", "light", "mace", "quarterstaff", "sickle", "spear"]
  const simpleRangedWeapons = ["light crossbow", "dart", "shortbow", "sling"]
  const martialMeleeWeapons = ["battleaxe", "flail", "glaive", "greataxe", "greatsword", "halberd", "lance", "longsword", "maul", "morningstar", "pike", "rapier", "scimitar", "shortsword", "trident", "war", "warhammer", "whip"]
  const martialRangedWeapons = ["blowgun", "heavy crossbow", "hand crossbow", "longbow", "net"]
  const lightArmor = ["padded", "leather", "studded leather"]
  const mediumArmor = ["hide", "chain shirt", "scale mail", "breastplate", "half plate"]
  const heavyArmor = ["ring mail", "chain mail", "splint", "plate"]
  const shields = ["shield"]
  const wearables = ["armband", "belt", "boots", "cloak", "earring", "facegear", "gloves", "headgear", "necklace", "pauldron", "ring", "tattoo"]
  const companion = ["humanoid", "dragonborn", "robotic"]

  const validateItem = async () => {
    // Create item from input fields
    const item: dndItem = JSON.parse(JSON.stringify(itemInputObj.value))

    // Validate and print error messages
    let error = false

    if (item.name.length < 2) itemInputError.value.name = 'Name is too short', error = true
    if (item.type === '' || item.type == undefined) itemInputError.value.type = 'You must select a type', error = true
    if (item.type.includes('Affix') && item.affixType == undefined) itemInputError.value.subtype = 'Must be either prefix or suffix', error = true
    if (item.type.includes('Affix') && item.affixType != undefined && item.base?.length === 0) itemInputError.value.subtype = 'You must select at least one base', error = true
    if (['armor', 'weapon', 'wearables'].includes(item.type)) {
      if (item.subtype === '' || item.subtype == undefined) itemInputError.value.subtype = 'You must select an item subtype', error = true
    }

    // Only continue if there are no errors
    if (error) return
    createItem(item).catch(err => console.log(err))
  }

  const resetError = () => {
    for (const key in itemInputError.value) {
      itemInputError.value[key] = undefined
    }
  }

  const resetItem = () => {
    resetError()
    itemInputObj.value = { name: '', type: '', subtype: '', base: [], rarity: 'common', price: 0, desc: '', imageUrl: '', src: '', attuned: false }
  }

  const toggleBases = (arr: string[]) => {
    let strike = 0
    for (const key in arr) {
      if (!itemInputObj.value.base?.includes(arr[key])) {
        itemInputObj.value.base?.push(arr[key])
      } else {
        strike++
      }
    }

    if (arr.length === strike) {
      for (const key in arr) {
        const index:number = itemInputObj.value.base?.indexOf(arr[key]) || 0
        itemInputObj.value.base?.splice(index, 1)
      }
    }
  }
</script>
<template>
  <div class="absolute w-full h-full backdrop-blur-sm backdrop-brightness-50">
    <div class="grid place-content-center w-full h-svh">
      <form @change="resetError" id="create" class="flex gap-4 p-8 rounded-lg bg-slate-600 border border-slate-800">
        <div class="flex flex-col flex-nowrap gap-2">
          <h1>Create your very own item!</h1>
          <span class="input-label">
            <label>Name</label>
            <input type="text" v-model="itemInputObj.name" placeholder="Name of your item">
            <p class="error">{{ itemInputError.name }}</p>
          </span>
          <span class="input-label">
            <label>Type</label>
            <select v-model="itemInputObj.type" class="text-black p-2" @change="itemInputObj.base = []; itemInputObj.affixType = undefined; itemInputObj.subtype = undefined">
              <option value="weapon">weapon</option>
              <option value="armor">armor</option>
              <option value="armorAffix">affix (armor)</option>
              <option value="ammoAffix">affix (ammo)</option>
              <option value="weaponAffix">affix (weapon)</option>
              <option value="trinket">trinket</option>
              <option value="wearables">wearables</option>
              <option value="companion">companion</option>
            </select>
            <p class="error">{{ itemInputError.type }}</p>
          </span>
          <span v-if="itemInputObj.type === 'weapon'" class="input-label">
            <label>Base</label>
            <select v-model="itemInputObj.subtype" class="text-black p-2">
              <optgroup label="Simple weapons">
                <option v-for="item in simpleMeleeWeapons" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
              <optgroup label="Martial weapons">
                <option v-for="item in martialMeleeWeapons" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
              <optgroup label="Simple ranged weapons">
                <option v-for="item in simpleRangedWeapons" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
              <optgroup label="Martial ranged weapons">
                <option v-for="item in martialRangedWeapons" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
            </select>
            <p class="error">{{ itemInputError.subtype }}</p>
          </span>
          <span v-if="itemInputObj.type === 'armor'" class="input-label">
            <label>Base</label>
            <select v-model="itemInputObj.subtype" class="text-black p-2">
              <optgroup label="Light">
                <option v-for="item in lightArmor" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
              <optgroup label="Medium">
                <option v-for="item in mediumArmor" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
              <optgroup label="Heavy">
                <option v-for="item in heavyArmor" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
              <optgroup label="Off-hand">
                <option v-for="item in shields" :value="item">{{ capitilize(item) }}</option>
              </optgroup>
            </select>
            <p class="error">{{ itemInputError.subtype }}</p>
          </span>
          <span v-if="itemInputObj.type.includes('Affix')" class="input-label">
            <label>Affix type</label>
            <select v-model="itemInputObj.affixType" class="text-black p-2">
              <option value="prefix">prefix</option>
              <option value="suffix">suffix</option>
            </select>
            <p class="error">{{ itemInputError.subtype }}</p>
          </span>
          <span v-if="itemInputObj.type === 'wearables'" class="input-label">
            <label>Base</label>
            <select v-model="itemInputObj.subtype" class="text-black p-2">
              <option v-for="item in wearables" :value="item">{{ capitilize(item) }}</option>
            </select>
            <p class="error">{{ itemInputError.subtype }}</p>
          </span>
          <span class="input-label">
            <label>Rarity</label>
            <select v-model="itemInputObj.rarity" class="text-black p-2" name="" id="">
              <option v-for="rarity in rarities" :style="{'color': rarity.color}" :value="convertWhitespace(rarity.label, '-')">{{ capitilize(rarity.label) }}</option>
            </select>
            {{ itemInputObj.rarity }}
          </span>
          <span class="input-label">
            <label>Price</label>
            <input type="number" v-model="itemInputObj.price" placeholder="what is the price">
          </span>
          <span class="input-label">
            <label>Description</label>
            <input type="text" v-model="itemInputObj.desc" placeholder="describe the item">
          </span>
          <span class="input-label">
            <label>Source</label>
            <input type="text" v-model="itemInputObj.src" placeholder="D&D book and page #">
          </span>
          <span class="flex justify-between">
            <label>Attuned</label>
            <input type="checkbox" v-model="itemInputObj.attuned">
          </span>
          <span class="flex justify-between gap-1">
            <button class="flex-1 py-1 bg-red-500 hover:bg-red-400 active:scale-105 rounded-lg" @click.prevent="resetItem">reset</button>
            <button class="flex-1 py-1 bg-green-500 hover:bg-green-400 active:scale-105 rounded-lg" @click.prevent="validateItem">create</button>
          </span>
        </div>
        <div v-if="itemInputObj.type == 'weaponAffix'" class="flex flex-col overflow-scroll max-h-[32rem] max-w-36">
          <h3>Presets</h3>
          <div class="flex gap-2 flex-wrap pb-4 text-xs">
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases([...simpleMeleeWeapons, ...martialMeleeWeapons])">melee</button>
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases([...simpleRangedWeapons, ...martialRangedWeapons])">ranged</button>
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases([...simpleMeleeWeapons, ...simpleRangedWeapons])">simple</button>
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases([...martialMeleeWeapons, ...martialRangedWeapons])">martial</button>
          </div>
          <h3>Simple melee weapons</h3>
          <template v-for="item in simpleMeleeWeapons">
            <span class="flex flex-nowrap gap-2 items-center">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
          <h3 class="pt-2">Martial melee weapons</h3>
          <template v-for="item in martialMeleeWeapons">
            <span class="flex flex-nowrap gap-2 items-center">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
          <h3 class="pt-2">Simple range weapons</h3>
          <template v-for="item in simpleRangedWeapons">
            <span class="flex flex-nowrap gap-2">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
          <h3 class="pt-2">Martial range weapons</h3>
          <template v-for="item in martialRangedWeapons">
            <span class="flex flex-nowrap gap-2">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
        </div>
        <div v-if="itemInputObj.type == 'armorAffix'" class="flex flex-col overflow-scroll max-h-[32rem] max-w-36">
          <h3>Presets</h3>
          <div class="flex gap-2 flex-wrap pb-4 text-xs">
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases(lightArmor)">Light</button>
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases(mediumArmor)">Medium</button>
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases(heavyArmor)">Heavy</button>
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases([...lightArmor, ...mediumArmor, ...heavyArmor, ...shields])">All</button>
            <button class="px-2 bg-teal-600 rounded" type="button" @click="toggleBases([...lightArmor, ...mediumArmor, ...heavyArmor])">Body</button>
          </div>
          <h3>Light armor</h3>
          <template v-for="item in lightArmor">
            <span class="flex flex-nowrap gap-2 items-center">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
          <h3 class="pt-2">Medium armor</h3>
          <template v-for="item in mediumArmor">
            <span class="flex flex-nowrap gap-2 items-center">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
          <h3 class="pt-2">Heavy armor</h3>
          <template v-for="item in heavyArmor">
            <span class="flex flex-nowrap gap-2">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
          <h3 class="pt-2">Shields</h3>
          <template v-for="item in shields">
            <span class="flex flex-nowrap gap-2">
              <input type="checkbox" :value="item" v-model="itemInputObj.base">
              <label>{{ item }}</label>
            </span>
          </template>
        </div>
        <ItemsPreview v-bind="itemInputObj" />
      </form>
    </div>
  </div>
</template>

<style scoped>
  #create {
    box-shadow: -3px -3px 7px #475569, 5px 5px 9px #1e293b;
  }
  input {
    color: black;
    padding: 0.25rem;
  }
  .input-label {
    display: flex;
    flex-flow: column nowrap;
  }
  .error {
    color: orangered;
  }
</style>