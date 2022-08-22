import { defineStore } from "pinia"
import { ref, watch } from "vue"
import type { Ref } from "vue"
import { useHttp } from "../composables/http.js"
import { useRequest } from "vue-request"

interface JSONDataType<DataType> {
    id: string,
    type: string,
    attributes: DataType
}
interface JSONAPI<DataType> {
    meta: {
        count: number,
        limit: number,
        offset: number
    }
    data: JSONDataType<DataType>[] | JSONDataType<DataType>
}

interface JSONAPIApplication {
    name: string,
    title: string,
    short_description: string
}

interface Application {
    id: string,
    name: string,
    title: string,
    short_description: string
}

export const useApplicationStore = defineStore(
    'applications',
    () => {
        const application: Ref<Application|null> = ref(null)
        const applications: Ref<Application[]> = ref([])

        const toModel = (json: JSONAPI<JSONAPIApplication>): Application | Application[] => {
            const mapModel = (d: JSONDataType<JSONAPIApplication>): Application => ({
                id: d.id,
                title: d.attributes.title,
                name: d.attributes.name,
                short_description: d.attributes.short_description
            })
            if (Array.isArray(json.data)) {
                return json.data.map(mapModel)
            }
            return mapModel(json.data)
        }

        const load = () => {
            const { data, loading, error } = useRequest(
                () => {
                    let api = useHttp.url('/portal/applications')
                    return api.get().json()
                },
                {
                    cacheKey: '/portal/applications',
                    errorRetryCount: 5,
                    refreshOnWindowFocus: false
                }
            )
            watch(
                data,
                json => {
                    applications.value = toModel(json as JSONAPI<JSONAPIApplication>) as Application[]
                }
            )
        }

        return {
            application,
            applications,
            load
        }
    }
)
