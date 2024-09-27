export default defineEventHandler(async (event) => {
    const companyId = getRouterParam(event, 'companyId')
    const conpanies = await useStorage('files').getItem('fake_db:companies.json')
    const result = conpanies.find((element) => element['id'] == companyId)
    return  result
})