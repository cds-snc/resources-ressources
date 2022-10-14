FROM public.ecr.aws/lambda/nodejs:14@sha256:017136f09311fe5342ce1c8f4381b5a40365eeadb190bc424912eb7a599e773d
COPY app .

COPY app/.contentful.json.sample ./.contentful.json

RUN npm install

RUN npm run build

CMD [ "handler.handler" ]