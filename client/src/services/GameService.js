import Api from '@/services/Api'

export default {
  playMovie (movie, actor) {
    return Api().post('play-turn', {'movie':movie, 'actor': actor})
  }
}
