export default defineEventHandler(async (event) => {
    const companyId = getRouterParam(event, 'companyId')
    const conpaniesInfo = await useStorage('files').getItem('fake_db:companiesInfo.json')
    const result = conpaniesInfo.find((element) => element['companyId'] == companyId)
    return  result
})