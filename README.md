# Clarivue

Clarivue is an intelligent interview management system that helps streamline the hiring process by automatically analyzing job descriptions and creating structured hiring criteria.

## Features

- 🤖 AI-powered job description analysis
- 📋 Automated hiring criteria extraction
- 🔍 Support for multiple job board integrations
- ✨ Modern React + TypeScript frontend
- 🚀 Express.js + OpenAI backend

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 8.x or later
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TOTskillconnect/clarivue.git
cd clarivue
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev:all
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

### Hiring Criteria

- `POST /api/criteria/analyze` - Analyze job description (text or URL)
- `POST /api/criteria` - Create new hiring criteria
- `GET /api/criteria` - Get all hiring criteria
- `GET /api/criteria/:id` - Get specific hiring criteria
- `PUT /api/criteria/:id` - Update hiring criteria
- `DELETE /api/criteria/:id` - Delete hiring criteria

## Development

- `npm run dev:client` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run build` - Build for production
- `npm run test` - Run tests

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key
- `PORT` - Backend server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 