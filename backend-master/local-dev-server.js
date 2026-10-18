const fs = require('fs');
const http = require('http');
const path = require('path');

const host = '127.0.0.1';
const port = Number(process.env.LOCAL_API_PORT || 8000);
const dataPath = process.env.LOCAL_API_DATA_PATH
  ? path.resolve(process.env.LOCAL_API_DATA_PATH)
  : path.join(__dirname, 'storage', 'app', 'local-dev-data.json');
const questionSeedPath = path.join(__dirname, 'app', 'Modules', 'Question', 'Database', 'Seeds', 'all.json');
const resultSeedPath = path.join(__dirname, 'app', 'Modules', 'Result', 'Database', 'Seeds', 'all.json');
const allowedOrigins = new Set([
  'http://localhost:4200',
  'http://127.0.0.1:4200',
]);

function loadSeed(pathname, label) {
  const seed = JSON.parse(fs.readFileSync(pathname, 'utf8'));
  if (!Array.isArray(seed) || seed.length === 0) {
    throw new Error('The local ' + label + ' seed data is missing or invalid: ' + pathname);
  }

  return seed;
}

const questionSeed = loadSeed(questionSeedPath, 'question');
const resultSeed = loadSeed(resultSeedPath, 'result');

function loadData() {
  if (!fs.existsSync(dataPath)) {
    return {nextChildId: 1, nextPlanId: 1, children: []};
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  if (!data || !Array.isArray(data.children)) {
    throw new Error('Local development data has an invalid format.');
  }

  return data;
}

let data = loadData();
function nextAvailableId(current, values) {
  const numericValues = values.map(Number).filter(Number.isFinite);
  const highest = numericValues.length ? Math.max.apply(Math, numericValues) + 1 : 1;
  return Math.max(Number(current) || 1, highest);
}

data.nextChildId = nextAvailableId(data.nextChildId, data.children.map(child => child.id));
data.nextPlanId = nextAvailableId(data.nextPlanId, data.children
  .filter(child => child.currentPlan)
  .map(child => child.currentPlan.id));

const stageNames = {
  1: 'Primera etapa',
  2: 'Segunda etapa',
  3: 'Tercera etapa',
};
const areas = [
  {id: 'local-area-cuerpo', slug: 'cuerpo', name: 'Cuerpo', picture: 'assets/img/areas/body.svg'},
  {id: 'local-area-mente', slug: 'mente', name: 'Mente', picture: 'assets/img/areas/brain.svg'},
  {id: 'local-area-corazon', slug: 'corazon', name: 'Corazón', picture: 'assets/img/areas/heart.svg'},
];
const answerOptions = [
  {__typename: 'AnswerOption', id: '1', slug: 'always', display: 'Siempre'},
  {__typename: 'AnswerOption', id: '2', slug: 'sometimes', display: 'A veces'},
  {__typename: 'AnswerOption', id: '3', slug: 'never', display: 'Nunca'},
];
const localUser = {
  __typename: 'User',
  id: 'local-user',
  name: 'Usuario local',
  picture: 'assets/icon/empty.svg',
};

function saveData() {
  const temporaryPath = dataPath + '.tmp';
  fs.mkdirSync(path.dirname(dataPath), {recursive: true});
  fs.writeFileSync(temporaryPath, JSON.stringify(data, null, 2));
  fs.renameSync(temporaryPath, dataPath);
}

function sendJson(response, status, payload) {
  response.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'});
  response.end(JSON.stringify(payload));
}

function childAge(birthdate) {
  if (!birthdate) {
    return 0;
  }

  const birth = new Date(birthdate);
  if (Number.isNaN(birth.getTime())) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth()
      || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return Math.max(age, 0);
}

function ageGroup(child) {
  const age = Number(child.age);
  if (!Number.isFinite(age) || age < 1) {
    return '1 a 2 años';
  }
  if (age > 7) {
    return null;
  }

  return age + ' a ' + (age + 1) + ' años';
}

function normalize(value) {
  return String(value || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function stageSlug(stageId) {
  const match = String(stageId || '').match(/(?:demo-stage-|local-stage-)?([1-3])$/);
  return match ? Number(match[1]) : 0;
}

function questionsForStage(child, slug) {
  const group = ageGroup(child);
  if (!group || !slug) {
    return [];
  }

  return questionSeed
    .map((question, index) => ({question, index}))
    .filter(item => item.question.EDAD === group && Number(item.question.NIVEL) === Number(slug));
}

function answersForPlan(child, planId) {
  return child.answersByPlan && child.answersByPlan[String(planId)] || {};
}

function questionId(index) {
  return 'local-question-' + String(index + 1).padStart(6, '0');
}

function presentQuestion(child, planId, item, idx) {
  const id = questionId(item.index);
  const answers = answersForPlan(child, planId);
  const answerOptionId = answers[id];
  const answerOption = answerOptions.find(option => option.id === String(answerOptionId));

  return {
    __typename: 'Question',
    id,
    display: String(item.question.RAZONAMIENTO || '').replace(/#Nombreniñ@/g, child.name),
    idx,
    answered: Boolean(answerOption),
    answerOption: answerOption ? {__typename: 'AnswerOption', id: answerOption.id} : null,
  };
}

function stageProgress(child, plan, slug) {
  const questions = questionsForStage(child, slug);
  if (!questions.length) {
    return 0;
  }

  const answers = answersForPlan(child, plan.id);
  const answered = questions.filter(item => answers[questionId(item.index)]).length;
  return Math.round(answered / questions.length * 100) / 100;
}

function stagesForChild(child, plan) {
  return [1, 2, 3]
    .filter(slug => questionsForStage(child, slug).length > 0)
    .map(slug => ({
      __typename: 'Stage',
      id: 'demo-stage-' + slug,
      slug,
      display: stageNames[slug],
      available: Boolean(child.demoAccess),
      progress: stageProgress(child, plan, slug),
      unlocked: slug === 1 || stageProgress(child, plan, slug - 1) === 1,
    }));
}

function findChildForPlan(planId) {
  return data.children.find(item => item.currentPlan
    && String(item.currentPlan.id) === String(planId));
}

function resultSlug(percentage) {
  if (percentage === 1) {
    return 'good';
  }
  if (percentage >= 0.5) {
    return 'so so';
  }
  if (percentage >= 0.1) {
    return 'bad';
  }
  return 'very bad';
}

function resultForArea(child, plan, slug, area) {
  const questions = questionsForStage(child, slug);
  if (!questions.length || stageProgress(child, plan, slug) < 1) {
    return null;
  }

  const areaQuestions = questions.filter(item => normalize(item.question.AREA) === normalize(area.name));
  const answers = answersForPlan(child, plan.id);
  const points = areaQuestions.reduce((total, item) => {
    const option = answerOptions.find(candidate => candidate.id === String(answers[questionId(item.index)]));
    return total + (option && option.slug === 'always' ? 5 : option && option.slug === 'sometimes' ? 1 : 0);
  }, 0);
  const percentage = points / 60;
  const slugValue = resultSlug(percentage);

  return {
    __typename: 'Result',
    id: 'local-result:' + plan.id + ':' + slug + ':' + area.slug,
    slug: slugValue,
    percentage,
    gaugeColor: percentage >= 0.8 ? '#2e7d32' : percentage >= 0.59 ? '#f9a825' : percentage >= 0.39 ? '#ef6c00' : '#c62828',
    gaugeCardColor: percentage === 1 ? '#66bb6a' : percentage >= 0.5 ? '#9ccc65' : percentage >= 0.1 ? '#ffee58' : '#ef5350',
    gaugeCardBackground: 'assets/img/areas/body.svg',
    _area: area,
  };
}

function resultDetails(child, plan, slug, area, result) {
  if (!result) {
    return null;
  }

  const age = ageGroup(child);
  const rows = resultSeed.filter(item => item.EDAD === age
    && Number(item.NIVEL) === Number(slug)
    && normalize(item.AREA) === normalize(area.name)
    && (item.RESULTADO === result.slug
      || (result.slug === 'very bad' && item.RESULTADO === 'ver bad')));
  const info = [];
  const games = [];
  const suggestions = [];

  rows.forEach((row, index) => {
    const display = String(row.INFO || '').replace(/#Nombreniñ@/g, child.name);
    if (display && info.indexOf(display) === -1) {
      info.push(display);
    }

    [1, 2].forEach(gameIndex => {
      const title = String(row['JUEGO' + gameIndex + '-TITULO'] || '').replace(/#Nombreniñ@/g, child.name);
      const body = String(row['JUEGO' + gameIndex + '-CUERPO'] || '').replace(/#Nombreniñ@/g, child.name);
      const materials = String(row['JUEGO' + gameIndex + '-MATERIALES'] || '').replace(/#Nombreniñ@/g, child.name);
      if (!title) {
        return;
      }

      const collection = normalize(title) === 'sugerencias' ? suggestions : games;
      const item = {
        __typename: collection === games ? 'Game' : 'Suggestion',
        id: 'local-content-' + slug + '-' + area.slug + '-' + index + '-' + gameIndex,
        title,
        body,
      };
      if (collection === games) {
        item.materials = materials;
      }

      if (!collection.some(existing => existing.title === title && existing.body === body)) {
        collection.push(item);
      }
    });
  });

  return Object.assign({}, result, {
    info: {__typename: 'ResultInfoCollection', data: info.map(display => ({__typename: 'ResultInfo', display}))},
    games: {__typename: 'GameCollection', data: games},
    suggestions: {__typename: 'SuggestionCollection', data: suggestions},
    gaugeCardBackground: 'assets/img/areas/body.svg',
    plan: {__typename: 'Plan', id: String(plan.id), child: presentChild(child)},
    area: {
      __typename: 'Area',
      id: area.id,
      name: area.name,
      slug: area.slug,
      picture: area.picture,
    },
  });
}

function stageForChild(child, plan, slug, includeQuestions) {
  if (!stagesForChild(child, plan).some(stage => stage.slug === Number(slug))) {
    return null;
  }

  const progress = stageProgress(child, plan, slug);
  const stage = {
    __typename: 'Stage',
    id: 'demo-stage-' + slug,
    slug: Number(slug),
    display: stageNames[slug],
    available: Boolean(child.demoAccess),
    progress,
    unlocked: Number(slug) === 1 || stageProgress(child, plan, Number(slug) - 1) === 1,
  };
  if (includeQuestions) {
    stage.questions = {
      __typename: 'QuestionCollection',
      data: questionsForStage(child, slug)
        .map((item, index) => presentQuestion(child, plan.id, item, index + 1)),
    };
  }
  return stage;
}

function operationName(request) {
  if (typeof request.operationName === 'string' && request.operationName) {
    return request.operationName;
  }

  const match = typeof request.query === 'string'
    && request.query.match(/\b(?:query|mutation)\s+([A-Za-z_][A-Za-z0-9_]*)/);
  return match ? match[1] : '';
}

function presentPlan(plan, child) {
  return Object.assign({__typename: 'Plan'}, plan, {
    stages: {
      __typename: 'StageCollection',
      data: child && child.demoAccess ? stagesForChild(child, plan) : plan.stages && plan.stages.data || [],
    },
  });
}

function presentChild(child) {
  return Object.assign({__typename: 'Child'}, child, {
    currentPlan: child.currentPlan ? presentPlan(child.currentPlan, child) : null,
  });
}

function executeOperation(name, variables) {
  const input = variables.input || {};

  switch (name) {
    case 'Me':
      return {me: localUser};
    case 'Children':
      return {children: {
        __typename: 'ChildCollection',
        data: data.children.map(presentChild),
      }};
    case 'Child':
    case 'ChildWithHistory': {
      const id = String(variables.childId || variables.id || '');
      const child = data.children.find(item => String(item.id) === id) || null;
      if (child) {
        const result = presentChild(child);
        if (name === 'ChildWithHistory') {
          result.history = [];
        }
        return {child: result};
      }
      return {child};
    }
    case 'UpsertChild': {
      const existing = data.children.find(item => String(item.id) === String(input.id));
      const plan = existing && existing.currentPlan ? existing.currentPlan : {
        id: String(data.nextPlanId++),
        idx: 1,
        completed: false,
        completedAt: null,
        stages: {data: []},
      };
      const child = Object.assign(existing || {}, {
        id: existing ? existing.id : String(data.nextChildId++),
        name: input.name || '',
        birthdate: input.birthdate || '',
        gender: input.gender || '',
        age: childAge(input.birthdate),
        picture: 'assets/icon/empty.svg',
        licensePrice: 0,
        hasActiveLicense: false,
        nextPlanAt: null,
        canCreatePlan: true,
        plansCompletedCount: 0,
        currentPlan: plan,
      });
      if (!existing) {
        data.children.push(child);
      }
      saveData();
      return {upsertChild: presentChild(child)};
    }
    case 'GrantDemoAccess': {
      const child = data.children.find(item => String(item.id) === String(variables.childId));
      if (!child) {
        return {grantDemoAccess: null};
      }

      child.hasActiveLicense = true;
      child.licensePrice = 0;
      child.demoAccess = true;
      child.answersByPlan = child.answersByPlan || {};
      if (child.currentPlan) {
        child.currentPlan.stages = {
          __typename: 'StageCollection',
          data: stagesForChild(child, child.currentPlan),
        };
      }
      saveData();
      return {grantDemoAccess: presentChild(child)};
    }
    case 'Plans': {
      const child = data.children.find(item => String(item.id) === String(variables.childId));
      return {plans: {
        __typename: 'PlanCollection',
        data: child && child.currentPlan
          ? [presentPlan(child.currentPlan)]
          : [],
      }};
    }
    case 'Plan': {
      const planId = String(variables.planId || '');
      const child = data.children.find(item => item.currentPlan
        && String(item.currentPlan.id) === planId);
      const plan = child ? Object.assign(presentPlan(child.currentPlan), {
        child: presentChild(child),
      }) : null;
      return {plan};
    }
    case 'Stages': {
      const child = findChildForPlan(variables.planId);
      return {stages: {
        __typename: 'StageCollection',
        data: child && child.demoAccess
          ? stagesForChild(child, child.currentPlan)
          : [],
      }};
    }
    case 'StagePage':
    case 'StageWithProgress': {
      const child = findChildForPlan(variables.planId);
      const slug = stageSlug(variables.id);
      const stage = child && child.demoAccess
        ? stageForChild(child, child.currentPlan, slug, name === 'StagePage')
        : null;
      return {stage};
    }
    case 'Signup':
    case 'Signin':
      return {[name === 'Signup' ? 'signup' : 'signin']: 'local-development-session'};
    case 'RegisterPushToken':
      return {registerPushToken: {token: input.token || ''}};
    case 'Tos':
      return {tos: {data: []}};
    case 'RapiTips':
      return {rapiTips: {data: []}};
    case 'RapiTip':
      return {rapiTip: null};
    case 'AnswerOptions':
      return {answerOptions: {
        __typename: 'AnswerOptionCollection',
        data: answerOptions.map(option => ({
          __typename: option.__typename,
          id: option.id,
          display: option.display,
        })),
      }};
    case 'Questions': {
      const child = findChildForPlan(variables.planId);
      const slug = stageSlug(variables.stageId);
      return {questions: {
        __typename: 'QuestionCollection',
        data: child && child.demoAccess
          ? questionsForStage(child, slug).map((item, index) => presentQuestion(child, variables.planId, item, index + 1))
          : [],
      }};
    }
    case 'NextQuestion': {
      const child = findChildForPlan(variables.planId);
      const slug = stageSlug(variables.stageId);
      const next = child && child.demoAccess
        ? questionsForStage(child, slug).find(item => !answersForPlan(child, variables.planId)[questionId(item.index)])
        : null;
      const index = next ? questionsForStage(child, slug).indexOf(next) + 1 : 0;
      return {nextQuestion: next ? presentQuestion(child, variables.planId, next, index) : null};
    }
    case 'Question': {
      const child = data.children.find(item => String(item.id) === String(variables.childId)
        && item.demoAccess
        && item.currentPlan
        && String(item.currentPlan.id) === String(variables.planId));
      const item = child
        ? questionSeed.map((question, index) => ({question, index}))
          .find(candidate => questionId(candidate.index) === String(variables.id))
        : null;
      const stageQuestions = item ? questionsForStage(child, Number(item.question.NIVEL)) : [];
      const index = item ? stageQuestions.findIndex(candidate => candidate.index === item.index) + 1 : 0;
      return {question: item ? presentQuestion(child, variables.planId, item, index) : null};
    }
    case 'AreasWithResult': {
      const child = data.children.find(item => String(item.id) === String(variables.childId)
        && item.currentPlan
        && String(item.currentPlan.id) === String(variables.planId)
        && item.demoAccess);
      const slug = stageSlug(variables.stageId);
      const stage = child ? stageForChild(child, child.currentPlan, slug, false) : null;
      return {areas: {
        __typename: 'AreaCollection',
        data: areas.map(area => ({
          __typename: 'Area',
          id: area.id,
          name: area.name,
          slug: area.slug,
          picture: area.picture,
          result: stage && stage.progress === 1
            ? resultForArea(child, child.currentPlan, slug, area)
            : null,
        })),
      }};
    }
    case 'Result': {
      const parts = String(variables.id || '').split(':');
      const child = parts.length === 4 && parts[0] === 'local-result'
        ? findChildForPlan(parts[1])
        : null;
      const area = areas.find(item => item.slug === parts[3]);
      const slug = stageSlug(parts[2]);
      const stage = child && child.demoAccess
        ? stageForChild(child, child.currentPlan, slug, false)
        : null;
      const result = child && area && stage && stage.progress === 1
        ? resultForArea(child, child.currentPlan, slug, area)
        : null;
      return {result: result ? resultDetails(child, child.currentPlan, slug, area, result) : null};
    }
    case 'CreatePlan':
      return {createPlan: null};
    case 'Answer': {
      const child = findChildForPlan(input.planId);
      const answerOption = answerOptions.find(option => option.id === String(input.answerOptionId));
      const item = questionSeed
        .map((question, index) => ({question, index}))
        .find(candidate => questionId(candidate.index) === String(input.questionId));
      if (!child || !child.demoAccess || !answerOption || !item) {
        return {answer: null};
      }

      const slug = Number(item.question.NIVEL);
      if (!questionsForStage(child, slug).some(candidate => candidate.index === item.index)) {
        return {answer: null};
      }

      child.answersByPlan = child.answersByPlan || {};
      child.answersByPlan[String(input.planId)] = child.answersByPlan[String(input.planId)] || {};
      child.answersByPlan[String(input.planId)][questionId(item.index)] = answerOption.id;
      child.currentPlan.stages = {
        __typename: 'StageCollection',
        data: stagesForChild(child, child.currentPlan),
      };

      const allQuestions = questionSeed.filter(question => question.EDAD === ageGroup(child));
      const planAnswers = answersForPlan(child, input.planId);
      if (allQuestions.length && allQuestions.every(question => {
        const index = questionSeed.indexOf(question);
        return Boolean(planAnswers[questionId(index)]);
      })) {
        child.currentPlan.completed = true;
        child.currentPlan.completedAt = new Date().toISOString();
      }

      saveData();
      return {answer: {__typename: 'Answer', id: 'local-answer-' + questionId(item.index)}};
    }
    default:
      return null;
  }
}

function handleGraphql(request, response, origin) {
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  if (request.method === 'OPTIONS') {
    if (origin && !allowedOrigins.has(origin)) {
      response.writeHead(403);
      response.end();
      return;
    }
    response.writeHead(204, {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, {errors: [{message: 'Use POST for local GraphQL requests.'}]});
    return;
  }

  let body = '';
  request.on('data', chunk => {
    body += chunk;
    if (body.length > 1024 * 1024) {
      response.writeHead(413);
      response.end();
      request.destroy();
    }
  });
  request.on('end', () => {
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      sendJson(response, 400, {errors: [{message: 'Request body must be valid JSON.'}]});
      return;
    }

    const name = operationName(payload);
    const result = executeOperation(name, payload.variables || {});
    if (result === null) {
      sendJson(response, 501, {
        errors: [{message: 'GraphQL operation is not implemented by the local demo API: ' + (name || 'unknown')}],
      });
      return;
    }

    sendJson(response, 200, {data: result});
  });
}

const server = http.createServer((request, response) => {
  const origin = request.headers.origin || '';
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  if (request.url === '/health' && request.method === 'GET') {
    sendJson(response, 200, {
      status: 'ok',
      mode: 'local-demo',
      persistentStorage: 'JSON',
      seededQuestions: questionSeed.length,
      seededResults: resultSeed.length,
    });
    return;
  }

  if (request.url === '/graphql') {
    handleGraphql(request, response, origin);
    return;
  }

  sendJson(response, 404, {error: 'Not found'});
});

server.listen(port, host, () => {
  console.log('Local demo GraphQL API: http://' + host + ':' + port + '/graphql');
  console.log('Health check: http://' + host + ':' + port + '/health');
  console.log('Data file: ' + dataPath);
  console.log('This API stores demo data as JSON. It does not connect to MySQL.');
});
