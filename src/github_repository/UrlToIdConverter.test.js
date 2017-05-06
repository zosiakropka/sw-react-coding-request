import UrlToIdConverter from './UrlToIdConverter';

describe('#convertUrlToId()', () => {
  it('returns null for argument other than String', () => {
    expect(UrlToIdConverter.convertUrlToId({not: 'a String'}))
      .toBe(null);
    expect(UrlToIdConverter.convertUrlToId(['not a String', 1]))
      .toBe(null);
    expect(UrlToIdConverter.convertUrlToId(3))
      .toBe(null);
  });

  it('returns null for String other than github repo URL', function() {
    expect(UrlToIdConverter.convertUrlToId(
      'git@not.github.com:zosia/exercise.git'
    )).toBe(null);
    expect(UrlToIdConverter.convertUrlToId(
      'whatever:zosia/exercise.git'
    )).toBe(null);
  });

  it('parses "git@github.com:<USERNAME>/<REPONAME>.git" format', () => {
    const url = 'git@github.com:zosia/exercise.git';
    const parsedId = UrlToIdConverter.convertUrlToId(url);

    expect(parsedId).toBe('zosia/exercise');
  });

  it('parses "git@github.com:<USERNAME>/<REPONAME>" format', () => {
    const url = 'git@github.com:zosia/exercise';
    const parsedId = UrlToIdConverter.convertUrlToId(url);

    expect(parsedId).toBe('zosia/exercise');
  });

  it('parses "https://github.com/<USERNAME>/<REPONAME>.git" format', () => {
    const url = 'https://github.com/zosia/exercise.git';
    const parsedId = UrlToIdConverter.convertUrlToId(url);

    expect(parsedId).toBe('zosia/exercise');
  });

  it('parses "https://github.com/<USERNAME>/<REPONAME>" format', () => {
    const url = 'https://github.com/zosia/exercise';
    const parsedId = UrlToIdConverter.convertUrlToId(url);

    expect(parsedId).toBe('zosia/exercise');
  });

  it('parses "http://github.com/<USERNAME>/<REPONAME>.git" format', () => {
    const url = 'http://github.com/zosia/exercise.git';
    const parsedId = UrlToIdConverter.convertUrlToId(url);

    expect(parsedId).toBe('zosia/exercise');
  });

  it('parses "http://github.com/<USERNAME>/<REPONAME>" format', () => {
    const url = 'http://github.com/zosia/exercise';
    const parsedId = UrlToIdConverter.convertUrlToId(url);

    expect(parsedId).toBe('zosia/exercise');
  });

  it('accepts username and reponame with dashes and underscores', () => {
    const url = 'git@github.com:zosia-wisniowolska_1/frontend_technical-exercise.git';
    const parsedId = UrlToIdConverter.convertUrlToId(url);

    expect(parsedId).toBe('zosia-wisniowolska_1/frontend_technical-exercise');
  });
});
