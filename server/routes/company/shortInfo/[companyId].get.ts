export default defineEventHandler(async (event) => {
    const companyId = getRouterParam(event, 'companyId')
    const conpaniesShortInfo = await useStorage('files').getItem('fake_db:companiesShortInfo.json')
    const result = conpaniesShortInfo.find((element) => element['companyId'] == companyId)
    return  result
})