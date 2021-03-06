import { useHttpAuth } from '/src/common/useHttp.js';

function toRuleModel(data) {
  return {
    action: data.attributes.action,
    name: data.attributes.name,
    remark: data.attributes.remark,
    subject: data.attributes.subject
  }
}

function toAbilityModel(data, included) {
  return {
    name: data.attributes.name,
    remark: data.attributes.remark,
    rules: data.relationships.rules.data.map(
      r => toRuleModel(included.find(i => i.type === 'rules' && i.id === r.id))
    )
  };
}

function toUserModel(data, included) {
  return {
    email: data.attributes.email,
    username: data.attributes.username,
    abilities: data.relationships.abilities.data.map(
      r => toAbilityModel(included.find(i => i.type === 'abilities' && i.id === r.id), included)
    )
  };
}

const get = () =>
  useHttpAuth
    .url('/auth')
    .get()
    .json((json) => toUserModel(json.data, json.included))
;

export const useUserService = () => ({
  get
});
