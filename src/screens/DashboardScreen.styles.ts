import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  greetingText: {
    fontSize: 16,
    color: '#64748b',
  },
  developerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  progressText: {
    marginTop: 16,
    fontSize: 14,
    color: '#334155',
  },
  activeSkillsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#0f172a',
  },
  skillCard: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 160,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  skillProgressText: {
    fontSize: 13,
    color: '#475569',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2563eb',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
  },
  activeSkillsSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    marginLeft: 2,
  },
  skillChartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressBarContainer: {
    marginVertical: 8,
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: '#cbd5e1',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  editButtonText: {
    color: '#2563eb',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: 'red',
    marginTop: 8,
  },
});

export default styles;
