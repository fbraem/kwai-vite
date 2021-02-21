import { useHttp } from '/src/common/useHttp';

import { dateToTimezone, formatDate } from '/src/common/useDayJS';

function toModel(json) {
    return json.data.map(d =>
    {
        const application = json.included.find((included) => included.type === 'applications' && included.id === d.relationships.application.data.id);
        return {
            id: d.id,
            title: d.attributes.contents[0].title,
            summary: d.attributes.contents[0].html_summary,
            publish_date: formatDate(dateToTimezone(d.attributes.publish_date, d.attributes.timezone), 'D MMMM, YYYY'),
            has_more: d.attributes.contents[0].html_content.length > 0,
            application: {
                id: application.id,
                name: application.attributes.name,
                title: application.attributes.title
            }
        };
    });
}

const load = ({ promoted = false, offset = 0, limit = 10 } = {}) => {
    let api = useHttp.url('/news/stories');
    if (offset > 0) {
        api = api.query({ 'page[offset]': offset });
    }
    api = api.query({ 'page[limit]': limit });
    if (promoted) {
        api = api.query({ 'filter[promoted]': true });
    }
    return api.get().json((json) => toModel(json));
}

const archive = () => {
    let api = useHttp.url('/news/archive')
    return api.get().json();
}

export const useNewsService = () => ({
    load,
    archive
});
