import { atom, useAtom } from "jotai"


type Config = {
  selected: null
  name:'',
}

const configAtom = atom<Config>({
  selected:null,
  name:'',
})

export function useMail() {
  return useAtom(configAtom)
}
