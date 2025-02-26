DROP USER IF EXISTS grace;
DROP DATABASE IF EXISTS kanban_db;

CREATE USER grace WITH PASSWORD 'howdypartner';
CREATE DATABASE kanban_db OWNER grace;

\c kanban_db

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO grace;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO grace;