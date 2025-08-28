


import { RootStackScreens } from "@/src/navigation/RootStack/types"

import { resetAndNavigate } from "@/src/utils/NavigationUtils"
import { useEffect } from "react"

export const useSplash = () => {
    useEffect(() => {
        let timer = setTimeout(async () => {
             resetAndNavigate(RootStackScreens.Home)
        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [])
}