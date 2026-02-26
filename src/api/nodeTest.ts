import assert from 'node:assert';
import { describe, it, mock } from 'node:test';

// Mock prisma before importing the app so the app picks up the mock
// Typed as Promise<any> so mockImplementation accepts any return value
const mockFindUnique = mock.fn(async (): Promise<any> => null);

mock.module('../prisma.js', {
    namedExports: {
        prisma: {
            authors: {
                findUnique: mockFindUnique,
                findMany: mock.fn(),
                count: mock.fn(),
                create: mock.fn(),
                update: mock.fn(),
                delete: mock.fn(),
            }
        }
    }
});

// Import app AFTER mocking
const { app } = await import('./authorsApi.js');

describe('GET /authors/:id', () => {

    it('returns the author when found', async () => {
        const fakeAuthor = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };

        // Tell the mock what to return for this test
        mockFindUnique.mock.mockImplementation(async () => fakeAuthor as any);

        const res = await app.request('/1');

        assert.strictEqual(res.status, 200);
        const body = await res.json();
        assert.deepStrictEqual(body, fakeAuthor);
    });

    it('returns 404 when author is not found', async () => {
        // Return null to simulate "not found"
        mockFindUnique.mock.mockImplementation(async () => null as any);

        const res = await app.request('/999');

        assert.strictEqual(res.status, 404);
        const body = await res.json();
        assert.deepStrictEqual(body, { error: 'not found' });
    });

});
