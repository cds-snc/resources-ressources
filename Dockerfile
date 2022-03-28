FROM public.ecr.aws/lambda/nodejs:14
COPY app .

COPY app/.contentful.json.sample ./.contentful.json

RUN npm install

RUN npm run build

CMD [ "handler.handler" ]