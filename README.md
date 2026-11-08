# UserManager

Cross-platform contact manager built with Expo and React Native. Contacts can be
listed, created, edited and deleted through a configurable REST API.

## Features

- Contact list with loading and empty states
- Add/edit form that requires `nome`, `telefone` and `endereco`
- Delete action with error alerts
- REST client isolated in `src/services/api.ts`

## Stack

- Expo 58 / React Native 0.88
- React 19
- TypeScript

## Structure

```
├── App.tsx                    # screen switching (list / form)
├── src/
│   ├── components/            # Button, Header, Input, UserCard, UserList, EmptyState
│   ├── screens/               # Home, UserForm
│   ├── services/api.ts        # REST client
│   └── types/user.ts          # User model
└── .env.example               # API URL template
```

## Configuration

Copy `.env.example` to `.env` and set the API endpoint:

```bash
EXPO_PUBLIC_API_URL=<your-api-url>
```

The client expects a REST resource that supports `GET`, `POST`, `PUT` and
`DELETE`, with the fields `nome`, `telefone` and `endereco`.

## Running

```bash
npm install
npm start        # then choose Android, iOS, or web
npm run lint
```
