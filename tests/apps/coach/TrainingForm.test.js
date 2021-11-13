import { Selector, RequestMock, Role, userVariables } from 'testcafe';

const user = Role('http://localhost:3000/coach.html#login', async t => {
  await t
    .typeText('#login_email', userVariables.login_email)
    .typeText('#login_password', userVariables.login_password)
    .click('#submit')
  ;
});

const mock = RequestMock()
  .onRequestTo('http://api.kwai.com/api/coaches')
  .respond((req, res) => {
    res.setBody({
      data: [
        {
          type: 'coaches',
          id: '1',
          attributes: {
            active: true
          },
          relationships: {
            member: {
              data: {
                type: 'members',
                id: '1'
              }
            }
          }
        }
      ],
      included: [
        {
          type: 'members',
          id: '1',
          attributes: {
            name: 'Jigoro Kano'
          }
        }
      ],
      meta: {
        count: 1
      }
    });
    res.statusCode = 200;
    res.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'include',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/vnd.api+json'
    };
  })
;

fixture('Training Form')
  .requestHooks(mock)
;

test
  .before(async t => {
    await t.useRole(user);
  })('Try to create a training without any values', async t => {
    await t.navigateTo('http://localhost:3000/coach.html#trainings/create');

    await t.click('#submit');

    await t.expect(Selector('#date_error').exists).ok();
    await t.expect(Selector('#title_error').exists).ok();
    await t.expect(Selector('#date_error').exists).ok();
    await t.expect(Selector('#start_time_error').exists).ok();
    await t.expect(Selector('#end_time_error').exists).ok();
    await t.expect(Selector('#coach_1').exists).ok();
  })
;

test
  .before(async t => {
    await t.useRole(user);
  })('Trying to create a training with a wrong values', async t => {
    await t
      .navigateTo('http://localhost:3000/coach.html#trainings/create');

    await t
      .typeText('#date', '1A-00-2021')
      .typeText('#start_time', '1A:00')
      .typeText('#end_time', '2A:00')
      .click(Selector('#submit'))
    ;

    await t.expect(Selector('#date_error').exists).ok();
    await t.expect(Selector('#start_time_error').exists).ok();
    await t.expect(Selector('#end_time_error').exists).ok();
  })
;

test
  .before(async t => {
    await t.useRole(user);
  })('Create a training', async t => {
    await t
      .navigateTo('http://localhost:3000/coach.html#trainings/create')
    ;

    await t
      .typeText(Selector('#title'), 'Test')
      .typeText(Selector('#summary'), 'This training is created with testcafe')
      .typeText(Selector('#date'), '01-11-2021')
      .typeText(Selector('#start_time'), '19:00')
      .typeText(Selector('#end_time'), '20:00')
      .typeText(Selector('#remark'), 'This training is created with testcafe')
      .click(Selector('#coach_1'))
      .click(Selector('#active'))
    ;
    await t.click(Selector('#submit'));
  })
;

test
  .before(async t => {
    await t.useRole(user);
  })('Update a training that does not exist', async t => {
    await t
      .navigateTo('http://localhost:3000/coach.html#/trainings/update/999999')
    ;

    // A div with role=alert should exist
    const alertSelector = Selector('div')
      .withAttribute('role', 'alert')
    ;
    await t.expect(alertSelector.exists).ok();
  })
;
