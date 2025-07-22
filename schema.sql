-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.trivia (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  question text,
  answer text,
  is_correct boolean,
  CONSTRAINT trivia_pkey PRIMARY KEY (id)
);